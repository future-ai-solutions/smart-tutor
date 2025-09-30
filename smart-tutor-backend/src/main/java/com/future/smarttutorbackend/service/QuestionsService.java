package com.future.smarttutorbackend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.future.smarttutorbackend.model.Lesson;
import com.future.smarttutorbackend.model.Question;
import com.future.smarttutorbackend.model.QuestionId;
import com.future.smarttutorbackend.repositry.QuestionRepository;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.StreamSupport;

@Service
public class QuestionsService {

    private final ClaudeChatService claudeChatService;
    private final AmazonPollyService amazonPollyService;
    private final QuestionRepository questionRepository;

    public QuestionsService(ClaudeChatService claudeChatService, AmazonPollyService amazonPollyService, QuestionRepository questionRepository) {
        this.claudeChatService = claudeChatService;
        this.amazonPollyService = amazonPollyService;
        this.questionRepository = questionRepository;
    }

    private Question generateQuestion(Lesson lesson, Long index) {
        Question question = new Question(new QuestionId(lesson.getId(), index));
        String generatedJsonQuestion = claudeChatService.generateQuestionContent(lesson);
        if (generatedJsonQuestion == null) {
            return question;
        }
        try {
            populateQuestion(generatedJsonQuestion, question);
            generateAudioUrls(question);
            return question;
        } catch (Exception e) {
            LoggerFactory.getLogger(QuestionsService.class).error(e.getMessage());
            return question;
        }
    }

    private void populateQuestion(String json, Question question) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        JsonNode jsonNode = mapper.readTree(json);

        question.setQuestion(jsonNode.get("statement").asText());
        question.setAnswer(jsonNode.get("answer").asInt());
        question.setChoices(
                StreamSupport.stream(jsonNode.get("choices").spliterator(), false)
                        .map(JsonNode::asText).toList()
        );
        question.setQuestionAudioUrl(jsonNode.get("questionNarratorText").asText());
        question.setCorrectFeedbackAudioUrl(jsonNode.get("feedbackCorrect").asText());
        question.setWrongFeedbackAudioUrl(jsonNode.get("feedbackIncorrect").asText());
    }

    private void generateAudioUrls(Question question) throws ExecutionException, InterruptedException {
        CompletableFuture<String> questionAudioUrl = CompletableFuture.supplyAsync(() -> amazonPollyService.textToSpeech(question.getQuestionAudioUrl()))
                .thenApply(audioUrl -> audioUrl)
                .exceptionally(ex -> {
                    System.err.println("Error: " + ex.getMessage());
                    return question.getQuestionAudioUrl();
                });

        CompletableFuture<String> correctFeedbackAudioUrl = CompletableFuture.supplyAsync(() -> amazonPollyService.textToSpeech(question.getCorrectFeedbackAudioUrl()))
                .thenApply(audioUrl -> audioUrl)
                .exceptionally(ex -> {
                    System.err.println("Error: " + ex.getMessage());
                    return question.getCorrectFeedbackAudioUrl();
                });

        CompletableFuture<String> wrongFeedbackAudioUrl = CompletableFuture.supplyAsync(() -> amazonPollyService.textToSpeech(question.getWrongFeedbackAudioUrl()))
                .thenApply(audioUrl -> audioUrl)
                .exceptionally(ex -> {
                    System.err.println("Error: " + ex.getMessage());
                    return question.getWrongFeedbackAudioUrl();
                });

        CompletableFuture.allOf(questionAudioUrl, correctFeedbackAudioUrl, wrongFeedbackAudioUrl).join();
        question.setQuestionAudioUrl(questionAudioUrl.get());
        question.setCorrectFeedbackAudioUrl(correctFeedbackAudioUrl.get());
        question.setWrongFeedbackAudioUrl(wrongFeedbackAudioUrl.get());
    }

    public Optional<Question> getQuestion(Long lessonId, Long index) {
        return questionRepository.findByIdLessonIdAndIdQuestionIndex(lessonId, index);
    }

    public void generateQuestions(Lesson lesson, int numberOfQuestions) {
        CompletableFuture.runAsync(() -> {
            for (int i = 0; i < numberOfQuestions; i++) {
                Question question = generateQuestion(lesson, (long) i);
                questionRepository.save(question);
            }
        });
    }


}
