package com.future.smarttutorbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeClient;
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelRequest;
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelResponse;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.Base64;
import java.util.UUID;

@Service
public class StableDiffusionService {

    private final S3Client s3Client;
    private final BedrockRuntimeClient bedrockClient;
    @Value("${aws.s3.bucket-name}") private String bucketName;
    @Value("${aws.bedrock.model-id}") private String modelId;


    public StableDiffusionService(S3Client s3Client, BedrockRuntimeClient bedrockClient) {
        this.s3Client = s3Client;
        this.bedrockClient = bedrockClient;
    }

    public String generateImage(String prompt) {

        String body = """
            {
                "prompt":"%s",
                "aspect_ratio":"16:9"
            }
            """.formatted(prompt);

        InvokeModelRequest request = InvokeModelRequest.builder()
                .modelId(modelId)
                .body(SdkBytes.fromUtf8String(body))
                .build();

        InvokeModelResponse response = bedrockClient.invokeModel(request);

        JsonNode root;
        try {
            root = new ObjectMapper()
                    .readTree(response.body().asUtf8String());
        } catch (JsonProcessingException e) {
            LoggerFactory.getLogger(StableDiffusionService.class).error("Failed to parse json response", e);
            return null;
        }
        String base64Image = root.get("images").get(0).asText();

        byte[] imageBytes = Base64.getDecoder().decode(base64Image);

        String key = "images/" + UUID.randomUUID() + ".png";
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .contentType("image/png")
                        .build(),
                RequestBody.fromBytes(imageBytes)
        );

        return S3Service.getPreSignedUrl(bucketName, key);
    }
}
