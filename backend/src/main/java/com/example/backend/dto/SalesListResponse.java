package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class SalesListResponse {
    @JsonProperty("prospects")
    private List<Prospect> prospects;
    
    @JsonProperty("totalCount")
    private Integer totalCount;
    
    @JsonProperty("generatedAt")
    private String generatedAt;
    
    @JsonProperty("summary")
    private String summary;
    
    public SalesListResponse() {}
    
    public SalesListResponse(List<Prospect> prospects, Integer totalCount, 
                            String generatedAt, String summary) {
        this.prospects = prospects;
        this.totalCount = totalCount;
        this.generatedAt = generatedAt;
        this.summary = summary;
    }
    
    // Getters and Setters
    public List<Prospect> getProspects() {
        return prospects;
    }
    
    public void setProspects(List<Prospect> prospects) {
        this.prospects = prospects;
    }
    
    public Integer getTotalCount() {
        return totalCount;
    }
    
    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }
    
    public String getGeneratedAt() {
        return generatedAt;
    }
    
    public void setGeneratedAt(String generatedAt) {
        this.generatedAt = generatedAt;
    }
    
    public String getSummary() {
        return summary;
    }
    
    public void setSummary(String summary) {
        this.summary = summary;
    }
}