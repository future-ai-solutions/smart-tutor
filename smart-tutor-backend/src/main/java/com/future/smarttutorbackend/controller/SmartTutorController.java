package com.future.smarttutorbackend.controller;

import com.future.smarttutorbackend.model.*;
import com.future.smarttutorbackend.service.ClearH2DatabaseService;
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
    private final ClearH2DatabaseService clearH2DatabaseService;

    public SmartTutorController(PromptOrchestratorService orchestratorService,
                                QuestionsService questionsService,
                                ClearH2DatabaseService clearH2DatabaseService) {
        this.orchestratorService = orchestratorService;
        this.questionsService = questionsService;
        this.clearH2DatabaseService = clearH2DatabaseService;
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

    @GetMapping("/clear")
    public void clear() {
        clearH2DatabaseService.clearH2Database();
    }
}
