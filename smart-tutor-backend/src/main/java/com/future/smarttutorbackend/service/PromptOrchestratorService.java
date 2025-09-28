package com.future.smarttutorbackend.service;

import com.future.smarttutorbackend.model.*;
import com.future.smarttutorbackend.repositry.LessonRepository;
import org.springframework.stereotype.Service;


@Service
public class PromptOrchestratorService {

    private final ClaudeChatService claudeChatService;
    private final LessonRepository lessonRepository;

    public PromptOrchestratorService(ClaudeChatService claudeChatService, LessonRepository lessonRepository) {
        this.claudeChatService = claudeChatService;
        this.lessonRepository = lessonRepository;
    }

    public Lesson generateLesson(PromptRequest promptRequest) {
        Lesson lesson = new Lesson();

        // Generate the title and content
        String claudeChatResponse = claudeChatService.getLessonContent(promptRequest);
        int newlineIndex = claudeChatResponse.indexOf('\n');
        if (newlineIndex != -1) {
            lesson.setTitle(claudeChatResponse.substring(0, newlineIndex).trim());
            lesson.setContent(claudeChatResponse.substring(newlineIndex + 1).trim());
        } else {
            lesson.setTitle(claudeChatResponse);
            lesson.setContent(claudeChatResponse);
        }

        /* Generate the audio and image */

        return lessonRepository.save(lesson);
    }

}
