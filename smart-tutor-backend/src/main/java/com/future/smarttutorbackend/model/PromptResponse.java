package com.future.smarttutorbackend.model;

public record PromptResponse(
        String title,
        String content,
        String imageUrl,
        String lessonAudioUrl,
        String encourageAudioUrl,
        Quiz quiz) {
}
