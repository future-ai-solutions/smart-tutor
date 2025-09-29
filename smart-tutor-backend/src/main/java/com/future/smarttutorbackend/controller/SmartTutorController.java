package com.future.smarttutorbackend.controller;

import com.future.smarttutorbackend.model.*;
import com.future.smarttutorbackend.repositry.LessonRepository;
import com.future.smarttutorbackend.repositry.QuestionRepository;
import com.future.smarttutorbackend.service.PromptOrchestratorService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Optional;


@RestController
@RequestMapping("/api/tutor")
public class SmartTutorController {

    private final PromptOrchestratorService orchestratorService;
    private final QuestionRepository questionRepository;
    private final LessonRepository lessonRepository;

    public SmartTutorController(PromptOrchestratorService orchestratorService, QuestionRepository questionRepository, LessonRepository lessonRepository) {
        this.orchestratorService = orchestratorService;
        this.questionRepository = questionRepository;
        this.lessonRepository = lessonRepository;
    }

    @PostMapping("/generate-lesson")
    public Lesson generateLesson(@RequestBody PromptRequest request) {
        return orchestratorService.generateLesson(request);
    }

    @GetMapping("/generate-question/{lessonId}/{questionIndex}")
    public Question getQuestions(@PathVariable Long lessonId,
                                     @PathVariable Long questionIndex) {

        return questionRepository.findByIdLessonIdAndIdQuestionIndex(lessonId, questionIndex)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Question with id " + questionIndex + " not found"
                ));
    }

}
