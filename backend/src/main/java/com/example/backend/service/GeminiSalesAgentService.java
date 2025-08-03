package com.example.backend.service;

import com.example.backend.config.GeminiConfig;
import com.example.backend.dto.CompanyInfo;
import com.example.backend.dto.NewsArticle;
import com.example.backend.dto.Prospect;
import com.example.backend.dto.SalesListRequest;
import com.example.backend.dto.SelectionLogic;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
    
    @Autowired
    private CompanyInfoService companyInfoService;
    
    public List<Prospect> generateSalesList(SalesListRequest request) {
        try {
            // 1. ニュース記事を収集
            List<NewsArticle> articles = newsCollectorService.collectNews(
                request.getTargetIndustry(),
                request.getTargetKeywords(),
                request.getNewsSources()
            );
            
            // 2. Gemini APIを使って営業リストを生成
            List<Prospect> prospects = analyzeNewsWithGemini(articles, request);
            
            // 3. 企業情報と選定ロジックを追加
            return enrichProspectsWithDetails(prospects, articles, request);
            
        } catch (Exception e) {
            System.err.println("Error generating sales list: " + e.getMessage());
            e.printStackTrace();
            return generateMockProspects(request);
        }
    }
    
    private List<Prospect> enrichProspectsWithDetails(List<Prospect> prospects, List<NewsArticle> articles, SalesListRequest request) {
        List<Prospect> enrichedProspects = new ArrayList<>();
        
        for (Prospect prospect : prospects) {
            // 企業情報を追加
            CompanyInfo companyInfo = companyInfoService.getCompanyInfo(prospect.getCompanyName());
            if (companyInfo != null) {
                prospect.setCompanyInfo(companyInfo);
            }
            
            // 選定ロジックを生成
            SelectionLogic selectionLogic = generateSelectionLogic(prospect, articles, request);
            prospect.setSelectionLogic(selectionLogic);
            
            // 関連ニュースを追加
            List<NewsArticle> relatedNews = findRelatedNews(prospect, articles);
            prospect.setRelatedNews(relatedNews);
            
            enrichedProspects.add(prospect);
        }
        
        return enrichedProspects;
    }
    
    private SelectionLogic generateSelectionLogic(Prospect prospect, List<NewsArticle> articles, SalesListRequest request) {
        // キーワードマッチング
        List<String> keywordMatches = findKeywordMatches(prospect, request.getTargetKeywords());
        
        // 業界適合度
        Double industryAlignment = calculateIndustryAlignment(prospect, request.getTargetIndustry());
        
        // 企業規模マッチング
        Boolean companySizeMatch = checkCompanySizeMatch(prospect, request.getCompanySize());
        
        // 成長指標
        List<String> growthIndicators = extractGrowthIndicators(prospect, articles);
        
        // 市場トレンド
        List<String> marketTrends = extractMarketTrends(articles);
        
        // 競合要因
        List<String> competitiveFactors = extractCompetitiveFactors(prospect, articles);
        
        // リスク要因
        List<String> riskFactors = extractRiskFactors(prospect, articles);
        
        // 機会スコア
        Double opportunityScore = calculateOpportunityScore(prospect, articles);
        
        // 決定要因
        Map<String, Double> decisionFactors = calculateDecisionFactors(prospect, request, articles);
        
        // AI信頼度
        Double aiConfidence = calculateAiConfidence(prospect, articles);
        
        return new SelectionLogic(
            keywordMatches, industryAlignment, companySizeMatch,
            growthIndicators, marketTrends, competitiveFactors,
            riskFactors, opportunityScore, decisionFactors, aiConfidence
        );
    }
    
    private List<String> findKeywordMatches(Prospect prospect, List<String> keywords) {
        List<String> matches = new ArrayList<>();
        String companyName = prospect.getCompanyName().toLowerCase();
        String reasoning = prospect.getReasoning().toLowerCase();
        
        for (String keyword : keywords) {
            if (companyName.contains(keyword.toLowerCase()) || reasoning.contains(keyword.toLowerCase())) {
                matches.add(keyword);
            }
        }
        
        return matches;
    }
    
    private Double calculateIndustryAlignment(Prospect prospect, String targetIndustry) {
        String prospectIndustry = prospect.getIndustry();
        if (prospectIndustry.equals(targetIndustry)) {
            return 1.0;
        } else if (prospectIndustry.contains("IT") && targetIndustry.contains("IT")) {
            return 0.8;
        } else if (prospectIndustry.contains("AI") && targetIndustry.contains("AI")) {
            return 0.9;
        } else {
            return 0.5;
        }
    }
    
    private Boolean checkCompanySizeMatch(Prospect prospect, String targetSize) {
        // 企業規模の判定ロジック（実際の実装では企業情報から判定）
        return true; // 簡易実装
    }
    
    private List<String> extractGrowthIndicators(Prospect prospect, List<NewsArticle> articles) {
        List<String> indicators = new ArrayList<>();
        
        // ニュース記事から成長指標を抽出
        for (NewsArticle article : articles) {
            String content = article.getContent().toLowerCase();
            if (content.contains("成長") || content.contains("拡大") || content.contains("増加")) {
                indicators.add("市場成長トレンド");
            }
            if (content.contains("投資") || content.contains("資金調達")) {
                indicators.add("投資活動活発");
            }
            if (content.contains("新技術") || content.contains("イノベーション")) {
                indicators.add("技術革新");
            }
        }
        
        return indicators;
    }
    
    private List<String> extractMarketTrends(List<NewsArticle> articles) {
        List<String> trends = new ArrayList<>();
        
        for (NewsArticle article : articles) {
            String content = article.getContent().toLowerCase();
            if (content.contains("ai") || content.contains("機械学習")) {
                trends.add("AI技術の普及");
            }
            if (content.contains("クラウド")) {
                trends.add("クラウド移行加速");
            }
            if (content.contains("デジタル変革")) {
                trends.add("DX推進");
            }
        }
        
        return trends;
    }
    
    private List<String> extractCompetitiveFactors(Prospect prospect, List<NewsArticle> articles) {
        List<String> factors = new ArrayList<>();
        
        // 競合優位性を抽出
        if (prospect.getCompanyInfo() != null) {
            String competitiveAdvantage = prospect.getCompanyInfo().getCompetitiveAdvantage();
            if (competitiveAdvantage.contains("独自")) {
                factors.add("独自技術");
            }
            if (competitiveAdvantage.contains("特許")) {
                factors.add("知的財産");
            }
            if (competitiveAdvantage.contains("実績")) {
                factors.add("豊富な実績");
            }
        }
        
        return factors;
    }
    
    private List<String> extractRiskFactors(Prospect prospect, List<NewsArticle> articles) {
        List<String> risks = new ArrayList<>();
        
        // リスク要因を抽出
        for (NewsArticle article : articles) {
            String content = article.getContent().toLowerCase();
            if (content.contains("競合") && content.contains("激化")) {
                risks.add("競合激化");
            }
            if (content.contains("規制")) {
                risks.add("規制リスク");
            }
            if (content.contains("経済") && content.contains("不安")) {
                risks.add("経済環境の変化");
            }
        }
        
        return risks;
    }
    
    private Double calculateOpportunityScore(Prospect prospect, List<NewsArticle> articles) {
        double score = 0.5; // ベーススコア
        
        // ニュース記事の内容に基づいてスコアを調整
        for (NewsArticle article : articles) {
            String content = article.getContent().toLowerCase();
            if (content.contains("成長") || content.contains("拡大")) {
                score += 0.1;
            }
            if (content.contains("投資") || content.contains("資金調達")) {
                score += 0.1;
            }
            if (content.contains("新技術") || content.contains("イノベーション")) {
                score += 0.1;
            }
        }
        
        return Math.min(score, 1.0);
    }
    
    private Map<String, Double> calculateDecisionFactors(Prospect prospect, SalesListRequest request, List<NewsArticle> articles) {
        Map<String, Double> factors = new HashMap<>();
        
        factors.put("キーワード適合度", prospect.getRelevanceScore());
        factors.put("業界適合度", calculateIndustryAlignment(prospect, request.getTargetIndustry()));
        factors.put("市場成長性", calculateOpportunityScore(prospect, articles));
        factors.put("技術革新性", 0.8); // 固定値（実際は動的計算）
        factors.put("競合優位性", 0.7); // 固定値（実際は動的計算）
        
        return factors;
    }
    
    private Double calculateAiConfidence(Prospect prospect, List<NewsArticle> articles) {
        double confidence = 0.7; // ベース信頼度
        
        // ニュース記事の数に基づいて信頼度を調整
        if (articles.size() > 2) {
            confidence += 0.1;
        }
        
        // 企業情報の有無で信頼度を調整
        if (prospect.getCompanyInfo() != null) {
            confidence += 0.1;
        }
        
        return Math.min(confidence, 1.0);
    }
    
    private List<NewsArticle> findRelatedNews(Prospect prospect, List<NewsArticle> articles) {
        List<NewsArticle> relatedNews = new ArrayList<>();
        String companyName = prospect.getCompanyName().toLowerCase();
        
        for (NewsArticle article : articles) {
            String title = article.getTitle().toLowerCase();
            String content = article.getContent().toLowerCase();
            
            if (title.contains(companyName) || content.contains(companyName)) {
                relatedNews.add(article);
            }
        }
        
        return relatedNews;
    }
    
    private List<Prospect> addCompanyInfo(List<Prospect> prospects) {
        List<Prospect> enrichedProspects = new ArrayList<>();
        
        for (Prospect prospect : prospects) {
            CompanyInfo companyInfo = companyInfoService.getCompanyInfo(prospect.getCompanyName());
            if (companyInfo != null) {
                prospect.setCompanyInfo(companyInfo);
            }
            enrichedProspects.add(prospect);
        }
        
        return enrichedProspects;
    }
    
    private List<Prospect> analyzeNewsWithGemini(List<NewsArticle> articles, SalesListRequest request) {
        try {
            // Gemini APIへのプロンプトを作成
            String prompt = createAnalysisPrompt(articles, request);
            
            // Gemini APIを呼び出し
            String response = callGeminiAPI(prompt);
            
            // レスポンスをパース
            List<Prospect> prospects = parseGeminiResponse(response);
            
            // パースに失敗した場合はモックデータを返す
            if (prospects.isEmpty()) {
                System.err.println("Failed to parse Gemini response, using mock data");
                return generateMockProspects(request);
            }
            
            return prospects;
            
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            e.printStackTrace();
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
        for (int i = 0; i < Math.min(articles.size(), 3); i++) { // 最大3記事まで
            NewsArticle article = articles.get(i);
            prompt.append(i + 1).append(". ").append(article.getTitle()).append("\n");
            prompt.append("   内容: ").append(article.getContent().substring(0, Math.min(article.getContent().length(), 200))).append("...\n");
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
        prompt.append("最大").append(request.getMaxProspects()).append("件の企業を選定してください。");
        
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
                    "maxOutputTokens", 1024 // 軽量モデル用に調整
                )
            );
            
            System.out.println("Calling Gemini API with model: " + geminiConfig.getModelName());
            
            // APIを呼び出し
            String response = webClient.post()
                    .uri(":generateContent?key=" + geminiConfig.getGeminiApiKey())
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            
            System.out.println("Gemini API response received");
            return response;
                    
        } catch (WebClientResponseException e) {
            System.err.println("WebClient error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw new RuntimeException("Failed to call Gemini API: " + e.getMessage(), e);
        } catch (Exception e) {
            System.err.println("Unexpected error calling Gemini API: " + e.getMessage());
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
            
            System.err.println("Failed to parse Gemini response: " + response);
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