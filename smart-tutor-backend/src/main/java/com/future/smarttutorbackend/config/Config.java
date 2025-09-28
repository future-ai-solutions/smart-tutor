package com.future.smarttutorbackend.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    ChatClient chatClient(ChatClient.Builder builder) {
        SmartTutorPrompts.loadAllSystemPromptsFromFiles();
        return builder.build();
    }

}
