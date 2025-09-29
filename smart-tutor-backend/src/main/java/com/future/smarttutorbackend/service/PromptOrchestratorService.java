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
    private final LessonRepository lessonRepository;

    public PromptOrchestratorService(ClaudeChatService claudeChatService,
                                     LessonRepository lessonRepository,
                                     StableDiffusionService stableDiffusionService) {
        this.claudeChatService = claudeChatService;
        this.lessonRepository = lessonRepository;
        this.stableDiffusionService = stableDiffusionService;
    }

    public Lesson generateLesson(PromptRequest promptRequest) {
        Lesson lesson = new Lesson();

        // Generate the title and content
        generateLessonContent(lesson, promptRequest);

        // Generate the lesson narrator text (Should be concurrent with the image generation)
        try {
            generateLessonMedia(lesson, promptRequest);
        } catch (Exception ignored) {
        }
        /* Generate the audio and image */

        return lessonRepository.save(lesson);
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

        CompletableFuture<String> generateLessonImage = CompletableFuture.supplyAsync(() -> generateLessonImage(lesson))
                .thenApply(response -> response)
                .exceptionally(ex -> {
                    System.err.println("Error: " + ex.getMessage());
                    return "";
                });

        CompletableFuture<String> generateLessonNarratorText = CompletableFuture.supplyAsync(() ->
                claudeChatService.generateLessonNarratorText(lesson.getContent(), promptRequest.childName()))
                .thenApply(response -> response)
                .exceptionally(ex -> {
                    System.err.println("Error: " + ex.getMessage());
                    return "";
                });

        CompletableFuture.allOf(generateLessonImage, generateLessonNarratorText).join();
        lesson.setAudioUrl(generateLessonNarratorText.get());
        lesson.setImageUrl(generateLessonImage.get());
    }

    private String generateLessonImage(Lesson lesson) {
        String generateLessonImageGenPrompt = claudeChatService.generateLessonStableDiffusionPrompt(lesson.getTitle());
        return stableDiffusionService.generateImage(generateLessonImageGenPrompt);
    }

}
