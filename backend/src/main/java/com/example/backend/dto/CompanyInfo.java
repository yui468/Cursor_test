package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CompanyInfo {
    @JsonProperty("companyName")
    private String companyName;
    
    @JsonProperty("industry")
    private String industry;
    
    @JsonProperty("description")
    private String description;
    
    @JsonProperty("foundedYear")
    private Integer foundedYear;
    
    @JsonProperty("employeeCount")
    private String employeeCount;
    
    @JsonProperty("revenue")
    private String revenue;
    
    @JsonProperty("headquarters")
    private String headquarters;
    
    @JsonProperty("website")
    private String website;
    
    @JsonProperty("mainProducts")
    private String mainProducts;
    
    @JsonProperty("recentNews")
    private String recentNews;
    
    @JsonProperty("businessModel")
    private String businessModel;
    
    @JsonProperty("targetMarket")
    private String targetMarket;
    
    @JsonProperty("competitiveAdvantage")
    private String competitiveAdvantage;
    
    @JsonProperty("growthPotential")
    private String growthPotential;
    
    public CompanyInfo() {}
    
    public CompanyInfo(String companyName, String industry, String description, 
                      Integer foundedYear, String employeeCount, String revenue,
                      String headquarters, String website, String mainProducts,
                      String recentNews, String businessModel, String targetMarket,
                      String competitiveAdvantage, String growthPotential) {
        this.companyName = companyName;
        this.industry = industry;
        this.description = description;
        this.foundedYear = foundedYear;
        this.employeeCount = employeeCount;
        this.revenue = revenue;
        this.headquarters = headquarters;
        this.website = website;
        this.mainProducts = mainProducts;
        this.recentNews = recentNews;
        this.businessModel = businessModel;
        this.targetMarket = targetMarket;
        this.competitiveAdvantage = competitiveAdvantage;
        this.growthPotential = growthPotential;
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
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getFoundedYear() {
        return foundedYear;
    }
    
    public void setFoundedYear(Integer foundedYear) {
        this.foundedYear = foundedYear;
    }
    
    public String getEmployeeCount() {
        return employeeCount;
    }
    
    public void setEmployeeCount(String employeeCount) {
        this.employeeCount = employeeCount;
    }
    
    public String getRevenue() {
        return revenue;
    }
    
    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }
    
    public String getHeadquarters() {
        return headquarters;
    }
    
    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }
    
    public String getWebsite() {
        return website;
    }
    
    public void setWebsite(String website) {
        this.website = website;
    }
    
    public String getMainProducts() {
        return mainProducts;
    }
    
    public void setMainProducts(String mainProducts) {
        this.mainProducts = mainProducts;
    }
    
    public String getRecentNews() {
        return recentNews;
    }
    
    public void setRecentNews(String recentNews) {
        this.recentNews = recentNews;
    }
    
    public String getBusinessModel() {
        return businessModel;
    }
    
    public void setBusinessModel(String businessModel) {
        this.businessModel = businessModel;
    }
    
    public String getTargetMarket() {
        return targetMarket;
    }
    
    public void setTargetMarket(String targetMarket) {
        this.targetMarket = targetMarket;
    }
    
    public String getCompetitiveAdvantage() {
        return competitiveAdvantage;
    }
    
    public void setCompetitiveAdvantage(String competitiveAdvantage) {
        this.competitiveAdvantage = competitiveAdvantage;
    }
    
    public String getGrowthPotential() {
        return growthPotential;
    }
    
    public void setGrowthPotential(String growthPotential) {
        this.growthPotential = growthPotential;
    }
}