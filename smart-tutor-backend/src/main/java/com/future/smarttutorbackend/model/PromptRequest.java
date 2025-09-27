package com.future.smarttutorbackend.model;

public record PromptRequest(String prompt, String childName, boolean showImage, boolean enableAssistant) {
}
