package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class SalesListRequest {
    @JsonProperty("targetIndustry")
    private String targetIndustry;
    
    @JsonProperty("targetKeywords")
    private List<String> targetKeywords;
    
    @JsonProperty("companySize")
    private String companySize; // "startup", "sme", "enterprise"
    
    @JsonProperty("maxProspects")
    private Integer maxProspects;
    
    @JsonProperty("newsSources")
    private List<String> newsSources;
    
    public SalesListRequest() {}
    
    public SalesListRequest(String targetIndustry, List<String> targetKeywords, 
                           String companySize, Integer maxProspects, List<String> newsSources) {
        this.targetIndustry = targetIndustry;
        this.targetKeywords = targetKeywords;
        this.companySize = companySize;
        this.maxProspects = maxProspects;
        this.newsSources = newsSources;
    }
    
    // Getters and Setters
    public String getTargetIndustry() {
        return targetIndustry;
    }
    
    public void setTargetIndustry(String targetIndustry) {
        this.targetIndustry = targetIndustry;
    }
    
    public List<String> getTargetKeywords() {
        return targetKeywords;
    }
    
    public void setTargetKeywords(List<String> targetKeywords) {
        this.targetKeywords = targetKeywords;
    }
    
    public String getCompanySize() {
        return companySize;
    }
    
    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }
    
    public Integer getMaxProspects() {
        return maxProspects;
    }
    
    public void setMaxProspects(Integer maxProspects) {
        this.maxProspects = maxProspects;
    }
    
    public List<String> getNewsSources() {
        return newsSources;
    }
    
    public void setNewsSources(List<String> newsSources) {
        this.newsSources = newsSources;
    }
}