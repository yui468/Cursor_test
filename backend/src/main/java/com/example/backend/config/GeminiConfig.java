package com.example.backend.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;



@Configuration
public class GeminiConfig {
    
    @Value("${gemini.api.key:}")
    private String geminiApiKey;
    
    @Value("${gemini.model.name:gemini-pro}")
    private String modelName;
    
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta/models/" + modelName)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
    
    public String getGeminiApiKey() {
        return geminiApiKey;
    }
    
    public String getModelName() {
        return modelName;
    }
}