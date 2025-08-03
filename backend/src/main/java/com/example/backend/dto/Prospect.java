package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Prospect {
    @JsonProperty("companyName")
    private String companyName;
    
    @JsonProperty("industry")
    private String industry;
    
    @JsonProperty("contactPerson")
    private String contactPerson;
    
    @JsonProperty("email")
    private String email;
    
    @JsonProperty("phone")
    private String phone;
    
    @JsonProperty("relevanceScore")
    private Double relevanceScore;
    
    @JsonProperty("reasoning")
    private String reasoning;
    
    @JsonProperty("newsSource")
    private String newsSource;
    
    public Prospect() {}
    
    public Prospect(String companyName, String industry, String contactPerson, String email, 
                   String phone, Double relevanceScore, String reasoning, String newsSource) {
        this.companyName = companyName;
        this.industry = industry;
        this.contactPerson = contactPerson;
        this.email = email;
        this.phone = phone;
        this.relevanceScore = relevanceScore;
        this.reasoning = reasoning;
        this.newsSource = newsSource;
    }
    
    // Getters and Setters
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getIndustry() {
        return industry;
    }
    
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    
    public String getContactPerson() {
        return contactPerson;
    }
    
    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public Double getRelevanceScore() {
        return relevanceScore;
    }
    
    public void setRelevanceScore(Double relevanceScore) {
        this.relevanceScore = relevanceScore;
    }
    
    public String getReasoning() {
        return reasoning;
    }
    
    public void setReasoning(String reasoning) {
        this.reasoning = reasoning;
    }
    
    public String getNewsSource() {
        return newsSource;
    }
    
    public void setNewsSource(String newsSource) {
        this.newsSource = newsSource;
    }
}