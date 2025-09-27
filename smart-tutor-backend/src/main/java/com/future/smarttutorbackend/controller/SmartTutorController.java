package com.future.smarttutorbackend.controller;

import com.future.smarttutorbackend.model.PromptRequest;
import com.future.smarttutorbackend.model.PromptResponse;
import com.future.smarttutorbackend.model.Question;
import com.future.smarttutorbackend.model.Quiz;
import com.future.smarttutorbackend.service.PromptOrchestratorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/api/tutor")
public class SmartTutorController {

    private final PromptOrchestratorService orchestratorService;

    public SmartTutorController(PromptOrchestratorService orchestratorService) {
        this.orchestratorService = orchestratorService;
    }

    @PostMapping("/generate")
    public PromptResponse generateLesson(@RequestBody PromptRequest request) {
        Question question1 = new Question(
                "example",
                Arrays.asList("example", "example", "example", "example"),
                "a",
                "example"
        );
        Question question2 = new Question(
                "example",
                Arrays.asList("example", "example", "example", "example"),
                "example",
                "example"
        );

        Quiz quiz = new Quiz(Arrays.asList(question1, question2));
        PromptResponse promptResponse = new PromptResponse(
                "example",
                "example content for " + request.childName(),
                "http://example",
                "http://example",
                "http://example",
                quiz
        );
        return promptResponse;
//        return orchestratorService.generatePromptResponse(request);
    }
}
