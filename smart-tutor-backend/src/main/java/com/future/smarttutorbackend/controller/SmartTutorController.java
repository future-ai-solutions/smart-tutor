package com.future.smarttutorbackend.controller;

import com.future.smarttutorbackend.model.*;
import com.future.smarttutorbackend.service.PromptOrchestratorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/tutor")
public class SmartTutorController {

    private final PromptOrchestratorService orchestratorService;

    public SmartTutorController(PromptOrchestratorService orchestratorService) {
        this.orchestratorService = orchestratorService;
    }

    @PostMapping("/generate-lesson")
    public Lesson generateLesson(@RequestBody PromptRequest request) {
        return orchestratorService.generateLesson(request);
    }

}
