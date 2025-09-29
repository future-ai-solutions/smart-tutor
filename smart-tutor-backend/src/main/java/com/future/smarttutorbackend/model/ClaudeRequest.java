package com.future.smarttutorbackend.model;

public class ClaudeRequest {
    public String anthropic_version = "anthropic.claude-3-5-sonnet-20240620-v1:0";
    public String system; // For the System Prompt
    public ClaudeMessage[] messages;
    public int max_tokens = 8192; // Example max tokens

    public ClaudeRequest(String systemPrompt, String userPrompt) {
        this.system = systemPrompt;
        this.messages = new ClaudeMessage[] {
                new ClaudeMessage("user", userPrompt)
        };
    }
}

