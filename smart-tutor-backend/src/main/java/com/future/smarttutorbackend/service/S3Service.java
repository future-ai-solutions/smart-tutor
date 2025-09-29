package com.future.smarttutorbackend.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.time.Duration;

@Service
public class S3Service {

    public static String getPreSignedUrl(String bucket, String key) {
        S3Presigner preSigner = S3Presigner.create();
        GetObjectRequest getReq = GetObjectRequest.builder()
                .bucket(bucket).key(key).build();
        GetObjectPresignRequest preSignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofHours(24))
                .getObjectRequest(getReq)
                .build();

        String preSignedUrl = preSigner.presignGetObject(preSignRequest).url().toString();
        preSigner.close();
        return preSignedUrl;
    }
}
