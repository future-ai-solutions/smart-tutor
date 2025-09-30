package com.future.smarttutorbackend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.future.smarttutorbackend.config.SmartTutorPrompts;
import com.future.smarttutorbackend.model.Lesson;
import com.future.smarttutorbackend.model.PromptRequest;
import com.future.smarttutorbackend.model.Question;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeAsyncClient;
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelRequest;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClaudeChatService {

    private final ChatClient chatClient;
    private final BedrockRuntimeAsyncClient bedrockRuntimeAsyncClient;

    public ClaudeChatService(ChatClient chatClient, BedrockRuntimeAsyncClient bedrockRuntimeAsyncClient) {
        this.chatClient = chatClient;
        this.bedrockRuntimeAsyncClient = bedrockRuntimeAsyncClient;
    }

    public String generateLessonContent(PromptRequest promptRequest) {
        return chatClient.prompt()
                .system(SmartTutorPrompts.CREATE_LESSON_CONTENT.getSystemPrompt())
                .user(promptRequest.prompt())
                .call()
                .content();
    }

    public String generateLessonNarratorText(String content, String childName) {
        return generateFromBedrockRuntime(SmartTutorPrompts.CREATE_LESSON_NARRATOR_TEXT.getSystemPrompt(), content + "\n" + childName);
    }

    private String generateFromBedrockRuntime(String systemPrompt, String userPrompt) {
        String MODEL_ID = "anthropic.claude-3-5-sonnet-20240620-v1:0";
        JSONObject requestBody = getBedrockPayload(systemPrompt, userPrompt);
        try {
            var response = bedrockRuntimeAsyncClient.invokeModel(InvokeModelRequest.builder()
                    .modelId(MODEL_ID)
                    .body(SdkBytes.fromUtf8String(requestBody.toString()))
                    .build()
            );

            String responseBody = response.get().body().asUtf8String();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode node = objectMapper.readTree(responseBody);
            return node.get("content").get(0).get("text").asText();

        } catch (Exception e) {
            LoggerFactory.getLogger(ClaudeChatService.class).error("Error while serializing ClaudeRequest", e);
            return null;
        }
    }

    private JSONObject getBedrockPayload(String systemPrompt, String userPrompt) {
        JSONObject requestBody = new JSONObject();
        requestBody.put("anthropic_version", "bedrock-2023-05-31");
        requestBody.put("max_tokens", 8192);
        requestBody.put("temperature", 1);
        requestBody.put("system", systemPrompt);

        // Create messages array
        JSONArray messages = new JSONArray();
        JSONObject message = new JSONObject();
        message.put("role", "user");
        message.put("content", userPrompt);
        messages.put(message);
        requestBody.put("messages", messages);
        return requestBody;
    }

    public String generateLessonStableDiffusionPrompt(String title) {
        return chatClient.prompt()
                .system(SmartTutorPrompts.CREATE_LESSON_IMAGE_GEN_PROMPT.getSystemPrompt())
                .user(title)
                .call()
                .content();
    }

    public String generateNewQuestionContent(Lesson lesson, List<Question> previousQuestions) {
        String questions = previousQuestions.stream().map(Question::getQuestion).collect(Collectors.joining("\n"));
        String userPrompt = """
                Content: "%s"
                Previously generated questions:
                %s
                """.formatted(lesson.getContent(), questions);
        return generateFromBedrockRuntime(SmartTutorPrompts.CREATE_QUESTION.getSystemPrompt(), userPrompt);
    }
}
