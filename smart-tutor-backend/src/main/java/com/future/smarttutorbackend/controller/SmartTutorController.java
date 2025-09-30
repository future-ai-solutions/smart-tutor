package com.future.smarttutorbackend.controller;

import com.future.smarttutorbackend.model.*;
import com.future.smarttutorbackend.service.PromptOrchestratorService;
import com.future.smarttutorbackend.service.QuestionsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/tutor")
public class SmartTutorController {

    private final PromptOrchestratorService orchestratorService;
    private final QuestionsService questionsService;

    public SmartTutorController(PromptOrchestratorService orchestratorService,
                                QuestionsService questionsService) {
        this.orchestratorService = orchestratorService;
        this.questionsService = questionsService;
    }

    @PostMapping("/generate-lesson")
    public Lesson generateLesson(@RequestBody PromptRequest request) {
        return orchestratorService.generateLesson(request);
    }


    @GetMapping("/generate-question/{lessonId}/{questionIndex}")
    public Question getQuestions(@PathVariable Long lessonId,
                                     @PathVariable Long questionIndex) {
        return questionsService.getQuestion(lessonId, questionIndex)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Question with id " + questionIndex + " not found"
                ));
    }

}
