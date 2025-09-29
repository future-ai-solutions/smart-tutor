package com.future.smarttutorbackend.config;

import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public enum SmartTutorPrompts {

    CREATE_LESSON_CONTENT("/prompts/create-lesson-content-system-prompt.txt"),
    CREATE_LESSON_NARRATOR_TEXT("/prompts/create-lesson-narrator-text-system-prompt.txt"),
    CREATE_LESSON_IMAGE_GEN_PROMPT("/prompts/create-lesson-image-gen-prompt-system-prompt.txt"),
    STABLE_DIFFUSION_NEGATIVE_PROMPT("/prompts/stable-diffusion-negative-prompt.txt"),;

    private final String fileName;
    private String content; // Field to store the file's content

    SmartTutorPrompts(String fileName) {
        this.fileName = fileName;
    }

    public String getSystemPrompt() {
        return content;
    }

    public static void loadAllSystemPromptsFromFiles() {
        for (SmartTutorPrompts constant : SmartTutorPrompts.values()) {
            try (InputStream in = SmartTutorPrompts.class.getResourceAsStream(constant.fileName)) {
                if (in == null) {
                    System.err.println(constant.fileName + " not found");
                    LoggerFactory.getLogger(SmartTutorPrompts.class).error("{} not found", constant.fileName);
                    return;
                }
                constant.content = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            } catch (IOException e) {
                System.err.println("Error reading file: " + constant.fileName);
                LoggerFactory.getLogger(SmartTutorPrompts.class).error("Error reading file", e);
            }
        }
    }
}
