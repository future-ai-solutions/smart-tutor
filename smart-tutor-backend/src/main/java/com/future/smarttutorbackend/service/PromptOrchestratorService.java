package com.future.smarttutorbackend.service;

import com.future.smarttutorbackend.model.*;
import com.future.smarttutorbackend.repositry.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;


@Service
public class PromptOrchestratorService {

    private final ClaudeChatService claudeChatService;
    private final StableDiffusionService stableDiffusionService;
    private final AmazonPollyService amazonPollyService;
    private final LessonRepository lessonRepository;
    private final QuestionsService questionsService;

    public PromptOrchestratorService(ClaudeChatService claudeChatService,
                                     LessonRepository lessonRepository,
                                     StableDiffusionService stableDiffusionService,
                                     AmazonPollyService amazonPollyService,
                                     QuestionsService questionsService) {
        this.claudeChatService = claudeChatService;
        this.lessonRepository = lessonRepository;
        this.stableDiffusionService = stableDiffusionService;
        this.amazonPollyService = amazonPollyService;
        this.questionsService = questionsService;
    }

    public Lesson generateLesson(PromptRequest promptRequest) {
        Lesson lesson = new Lesson();

        // Generate the title and content
        generateLessonContent(lesson, promptRequest);
        lessonRepository.save(lesson);

        try {
            generateLessonMedia(lesson, promptRequest);
        } catch (Exception ignored) {
        }

        questionsService.generateQuestions(lesson, promptRequest.numberOfQuestions());

        return lesson;
    }

    private void generateLessonContent(Lesson lesson, PromptRequest promptRequest) {
        String claudeChatResponse = claudeChatService.generateLessonContent(promptRequest);
        int newlineIndex = claudeChatResponse.indexOf('\n');
        if (newlineIndex != -1) {
            lesson.setTitle(claudeChatResponse.substring(0, newlineIndex).trim());
            lesson.setContent(claudeChatResponse.substring(newlineIndex + 1).trim());
        } else {
            lesson.setTitle(claudeChatResponse);
            lesson.setContent(claudeChatResponse);
        }
    }

    private void generateLessonMedia(Lesson lesson, PromptRequest promptRequest) throws ExecutionException, InterruptedException {
        CompletableFuture<String> generateLessonImage = CompletableFuture.supplyAsync(() -> generateLessonImage(lesson, promptRequest))
                .thenApply(response -> response)
                .exceptionally(ex -> {
                    System.err.println("Error: " + ex.getMessage());
                    return "";
                });

        CompletableFuture<String> generateLessonAudio = CompletableFuture.supplyAsync(() -> generateLessonAudio(lesson, promptRequest))
                .thenApply(response -> response)
                .exceptionally(ex -> {
                    System.err.println("Error: " + ex.getMessage());
                    return "";
                });

        CompletableFuture.allOf(generateLessonImage, generateLessonAudio).join();
        lesson.setAudioUrl(generateLessonAudio.get());
        lesson.setImageUrl(generateLessonImage.get());
    }

    private String generateLessonImage(Lesson lesson, PromptRequest promptRequest) {
        if (!promptRequest.showImages())
            return null;
        String generateLessonImageGenPrompt = claudeChatService.generateLessonStableDiffusionPrompt(lesson.getTitle());
        return stableDiffusionService.generateImage(generateLessonImageGenPrompt);
    }

    private String generateLessonAudio(Lesson lesson, PromptRequest promptRequest) {
        if (!promptRequest.enableAssistant())
            return null;
        String narratorText = claudeChatService.generateLessonNarratorText(lesson.getContent(), promptRequest.childName());
        return amazonPollyService.textToSpeech(narratorText);
    }

}
