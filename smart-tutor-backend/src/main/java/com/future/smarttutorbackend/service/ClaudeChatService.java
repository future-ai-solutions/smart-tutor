package com.future.smarttutorbackend.service;

import com.future.smarttutorbackend.config.SmartTutorPrompts;
import com.future.smarttutorbackend.model.PromptRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ClaudeChatService {

    private final ChatClient chatClient;

    public ClaudeChatService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String generateLessonContent(PromptRequest promptRequest) {
        return chatClient.prompt()
                .system(SmartTutorPrompts.CREATE_LESSON_CONTENT.getSystemPrompt())
                .user(promptRequest.prompt())
                .call()
                .content();
    }

    public String generateLessonNarratorText(String content, String childName) {
        return chatClient.prompt()
                .system(SmartTutorPrompts.CREATE_LESSON_NARRATOR_TEXT.getSystemPrompt())
                .user(content + "\n" + childName)
                .call()
                .content();
    }

    public String generateLessonStableDiffusionPrompt(String title) {
        return chatClient.prompt()
                .system(SmartTutorPrompts.CREATE_LESSON_IMAGE_GEN_PROMPT.getSystemPrompt())
                .user(title)
                .call()
                .content();
    }






}
