package com.future.smarttutorbackend.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.polly.PollyClient;
import software.amazon.awssdk.services.polly.model.*;

@Service
public class AmazonPollyService {

    private final PollyClient pollyClient;
    private static final String BUCKET = "smart-tutor-polly-audios";

    public AmazonPollyService(PollyClient pollyClient) {
        this.pollyClient = pollyClient;
    }

    public String textToSpeech(String text) {
        StartSpeechSynthesisTaskRequest request = StartSpeechSynthesisTaskRequest.builder()
                .engine(Engine.NEURAL)
                .voiceId(VoiceId.ZAYD)
                .languageCode(LanguageCode.ARB)
                .outputFormat(OutputFormat.MP3)
                .text(text)
                .outputS3BucketName(BUCKET)
                .build();
        StartSpeechSynthesisTaskResponse response = pollyClient.startSpeechSynthesisTask(request);

        String s3Uri = response.synthesisTask().outputUri();
        String key = s3Uri.substring(s3Uri.indexOf(BUCKET) + BUCKET.length() + 1);

        return S3Service.getPreSignedUrl(BUCKET, key);
    }
}
