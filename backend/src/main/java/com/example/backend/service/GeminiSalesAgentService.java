package com.example.backend.service;

import com.example.backend.config.GeminiConfig;
import com.example.backend.dto.NewsArticle;
import com.example.backend.dto.Prospect;
import com.example.backend.dto.SalesListRequest;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GeminiSalesAgentService {
    
    @Autowired
    private GeminiConfig geminiConfig;
    
    @Autowired
    private WebClient webClient;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private NewsCollectorService newsCollectorService;
    
    public List<Prospect> generateSalesList(SalesListRequest request) {
        try {
            // 1. ニュース記事を収集
            List<NewsArticle> articles = newsCollectorService.collectNews(
                request.getTargetIndustry(),
                request.getTargetKeywords(),
                request.getNewsSources()
            );
            
            // 2. Gemini APIを使って営業リストを生成
            return analyzeNewsWithGemini(articles, request);
            
        } catch (Exception e) {
            System.err.println("Error generating sales list: " + e.getMessage());
            return generateMockProspects(request);
        }
    }
    
    private List<Prospect> analyzeNewsWithGemini(List<NewsArticle> articles, SalesListRequest request) {
        try {
            // Gemini APIへのプロンプトを作成
            String prompt = createAnalysisPrompt(articles, request);
            
            // Gemini APIを呼び出し
            String response = callGeminiAPI(prompt);
            
            // レスポンスをパース
            return parseGeminiResponse(response);
            
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            return generateMockProspects(request);
        }
    }
    
    private String createAnalysisPrompt(List<NewsArticle> articles, SalesListRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("あなたは営業リスト作成の専門家です。以下のニュース記事を分析して、");
        prompt.append("営業対象となる企業のリストを作成してください。\n\n");
        
        prompt.append("【営業条件】\n");
        prompt.append("- 対象業界: ").append(request.getTargetIndustry()).append("\n");
        prompt.append("- キーワード: ").append(String.join(", ", request.getTargetKeywords())).append("\n");
        prompt.append("- 企業規模: ").append(request.getCompanySize()).append("\n");
        prompt.append("- 最大件数: ").append(request.getMaxProspects()).append("件\n\n");
        
        prompt.append("【ニュース記事】\n");
        for (int i = 0; i < articles.size(); i++) {
            NewsArticle article = articles.get(i);
            prompt.append(i + 1).append(". ").append(article.getTitle()).append("\n");
            prompt.append("   内容: ").append(article.getContent()).append("\n");
            prompt.append("   ソース: ").append(article.getSource()).append("\n\n");
        }
        
        prompt.append("【出力形式】\n");
        prompt.append("以下のJSON形式で回答してください：\n");
        prompt.append("[\n");
        prompt.append("  {\n");
        prompt.append("    \"companyName\": \"企業名\",\n");
        prompt.append("    \"industry\": \"業界\",\n");
        prompt.append("    \"contactPerson\": \"担当者名（推定）\",\n");
        prompt.append("    \"email\": \"メールアドレス（推定）\",\n");
        prompt.append("    \"phone\": \"電話番号（推定）\",\n");
        prompt.append("    \"relevanceScore\": 0.85,\n");
        prompt.append("    \"reasoning\": \"選定理由\",\n");
        prompt.append("    \"newsSource\": \"関連ニュースソース\"\n");
        prompt.append("  }\n");
        prompt.append("]\n\n");
        
        prompt.append("関連性スコアは0.0から1.0の間で、1.0が最も関連性が高いことを示します。");
        prompt.append("選定理由には、なぜこの企業が営業対象として適しているかの具体的な理由を記載してください。");
        
        return prompt.toString();
    }
    
    private String callGeminiAPI(String prompt) {
        try {
            // Gemini APIのリクエストボディを作成
            Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of(
                    "parts", List.of(Map.of("text", prompt))
                )),
                "generationConfig", Map.of(
                    "temperature", 0.3,
                    "topK", 40,
                    "topP", 0.95,
                    "maxOutputTokens", 2048
                )
            );
            
            // APIを呼び出し
            return webClient.post()
                    .uri(":generateContent?key=" + geminiConfig.getGeminiApiKey())
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
                    
        } catch (Exception e) {
            throw new RuntimeException("Failed to call Gemini API", e);
        }
    }
    
    private List<Prospect> parseGeminiResponse(String response) {
        try {
            JsonNode responseNode = objectMapper.readTree(response);
            JsonNode candidates = responseNode.get("candidates");
            
            if (candidates != null && candidates.isArray() && candidates.size() > 0) {
                JsonNode content = candidates.get(0).get("content");
                if (content != null) {
                    JsonNode parts = content.get("parts");
                    if (parts != null && parts.isArray() && parts.size() > 0) {
                        String text = parts.get(0).get("text").asText();
                        
                        // JSON部分を抽出（```json と ``` の間）
                        String jsonText = extractJsonFromText(text);
                        
                        if (jsonText != null) {
                            return objectMapper.readValue(jsonText, new TypeReference<List<Prospect>>() {});
                        }
                    }
                }
            }
            
            return new ArrayList<>();
            
        } catch (Exception e) {
            System.err.println("Error parsing Gemini response: " + e.getMessage());
            return new ArrayList<>();
        }
    }
    
    private String extractJsonFromText(String text) {
        // ```json と ``` の間のテキストを抽出
        int startIndex = text.indexOf("```json");
        if (startIndex == -1) {
            startIndex = text.indexOf("[");
        }
        
        if (startIndex != -1) {
            int endIndex = text.lastIndexOf("]");
            if (endIndex > startIndex) {
                return text.substring(startIndex, endIndex + 1);
            }
        }
        
        return null;
    }
    
    private List<Prospect> generateMockProspects(SalesListRequest request) {
        List<Prospect> prospects = new ArrayList<>();
        
        String[] mockCompanies = {
            "テックスタートアップ株式会社",
            "イノベーション企業",
            "デジタルソリューションズ",
            "フューチャーテック",
            "スマートビジネス",
            "AIソリューションズ",
            "クラウドテック",
            "データサイエンス企業"
        };
        
        String[] mockIndustries = {
            request.getTargetIndustry(),
            "IT・ソフトウェア",
            "AI・機械学習",
            "クラウドサービス"
        };
        
        String[] mockNames = {
            "田中太郎",
            "佐藤花子",
            "鈴木一郎",
            "高橋美咲",
            "渡辺健太"
        };
        
        for (int i = 0; i < Math.min(request.getMaxProspects(), mockCompanies.length); i++) {
            Prospect prospect = new Prospect(
                mockCompanies[i],
                mockIndustries[i % mockIndustries.length],
                mockNames[i % mockNames.length],
                "contact@" + mockCompanies[i].toLowerCase().replaceAll("[^a-zA-Z0-9]", "") + ".com",
                "03-1234-" + String.format("%04d", 1000 + i),
                0.8 - (i * 0.1),
                request.getTargetKeywords().get(0) + "に関連する事業を展開しており、営業対象として適している",
                "Mock News Source"
            );
            prospects.add(prospect);
        }
        
        return prospects;
    }
}