package com.future.smarttutorbackend.model;

public record PromptRequest(String prompt, String childName, int numberOfQuestions, boolean showImage, boolean enableAssistant) {
    @Override
    public String toString() {
        return "{" +
                "prompt='" + prompt + '\'' +
                ", childName='" + childName + '\'' +
                ", numberOfQuestions=" + numberOfQuestions +
                '}';
    }
}
