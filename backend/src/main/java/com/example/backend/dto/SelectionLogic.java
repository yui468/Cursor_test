package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

public class SelectionLogic {
    @JsonProperty("keywordMatches")
    private List<String> keywordMatches;
    
    @JsonProperty("industryAlignment")
    private Double industryAlignment;
    
    @JsonProperty("companySizeMatch")
    private Boolean companySizeMatch;
    
    @JsonProperty("growthIndicators")
    private List<String> growthIndicators;
    
    @JsonProperty("marketTrends")
    private List<String> marketTrends;
    
    @JsonProperty("competitiveFactors")
    private List<String> competitiveFactors;
    
    @JsonProperty("riskFactors")
    private List<String> riskFactors;
    
    @JsonProperty("opportunityScore")
    private Double opportunityScore;
    
    @JsonProperty("decisionFactors")
    private Map<String, Double> decisionFactors;
    
    @JsonProperty("aiConfidence")
    private Double aiConfidence;
    
    public SelectionLogic() {}
    
    public SelectionLogic(List<String> keywordMatches, Double industryAlignment, 
                         Boolean companySizeMatch, List<String> growthIndicators,
                         List<String> marketTrends, List<String> competitiveFactors,
                         List<String> riskFactors, Double opportunityScore,
                         Map<String, Double> decisionFactors, Double aiConfidence) {
        this.keywordMatches = keywordMatches;
        this.industryAlignment = industryAlignment;
        this.companySizeMatch = companySizeMatch;
        this.growthIndicators = growthIndicators;
        this.marketTrends = marketTrends;
        this.competitiveFactors = competitiveFactors;
        this.riskFactors = riskFactors;
        this.opportunityScore = opportunityScore;
        this.decisionFactors = decisionFactors;
        this.aiConfidence = aiConfidence;
    }
    
    // Getters and Setters
    public List<String> getKeywordMatches() {
        return keywordMatches;
    }
    
    public void setKeywordMatches(List<String> keywordMatches) {
        this.keywordMatches = keywordMatches;
    }
    
    public Double getIndustryAlignment() {
        return industryAlignment;
    }
    
    public void setIndustryAlignment(Double industryAlignment) {
        this.industryAlignment = industryAlignment;
    }
    
    public Boolean getCompanySizeMatch() {
        return companySizeMatch;
    }
    
    public void setCompanySizeMatch(Boolean companySizeMatch) {
        this.companySizeMatch = companySizeMatch;
    }
    
    public List<String> getGrowthIndicators() {
        return growthIndicators;
    }
    
    public void setGrowthIndicators(List<String> growthIndicators) {
        this.growthIndicators = growthIndicators;
    }
    
    public List<String> getMarketTrends() {
        return marketTrends;
    }
    
    public void setMarketTrends(List<String> marketTrends) {
        this.marketTrends = marketTrends;
    }
    
    public List<String> getCompetitiveFactors() {
        return competitiveFactors;
    }
    
    public void setCompetitiveFactors(List<String> competitiveFactors) {
        this.competitiveFactors = competitiveFactors;
    }
    
    public List<String> getRiskFactors() {
        return riskFactors;
    }
    
    public void setRiskFactors(List<String> riskFactors) {
        this.riskFactors = riskFactors;
    }
    
    public Double getOpportunityScore() {
        return opportunityScore;
    }
    
    public void setOpportunityScore(Double opportunityScore) {
        this.opportunityScore = opportunityScore;
    }
    
    public Map<String, Double> getDecisionFactors() {
        return decisionFactors;
    }
    
    public void setDecisionFactors(Map<String, Double> decisionFactors) {
        this.decisionFactors = decisionFactors;
    }
    
    public Double getAiConfidence() {
        return aiConfidence;
    }
    
    public void setAiConfidence(Double aiConfidence) {
        this.aiConfidence = aiConfidence;
    }
}