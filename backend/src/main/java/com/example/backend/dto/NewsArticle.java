package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewsArticle {
    @JsonProperty("title")
    private String title;
    
    @JsonProperty("content")
    private String content;
    
    @JsonProperty("url")
    private String url;
    
    @JsonProperty("publishedAt")
    private String publishedAt;
    
    @JsonProperty("source")
    private String source;
    
    public NewsArticle() {}
    
    public NewsArticle(String title, String content, String url, String publishedAt, String source) {
        this.title = title;
        this.content = content;
        this.url = url;
        this.publishedAt = publishedAt;
        this.source = source;
    }
    
    // Getters and Setters
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getPublishedAt() {
        return publishedAt;
    }
    
    public void setPublishedAt(String publishedAt) {
        this.publishedAt = publishedAt;
    }
    
    public String getSource() {
        return source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }
}