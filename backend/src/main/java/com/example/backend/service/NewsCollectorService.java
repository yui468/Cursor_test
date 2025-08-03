package com.example.backend.service;

import com.example.backend.dto.NewsArticle;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class NewsCollectorService {
    
    @Autowired
    private WebClient webClient;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    public List<NewsArticle> collectNews(String industry, List<String> keywords, List<String> sources) {
        List<NewsArticle> articles = new ArrayList<>();
        
        // 複数のニュースソースから記事を収集
        for (String source : sources) {
            try {
                List<NewsArticle> sourceArticles = collectFromSource(source, industry, keywords);
                articles.addAll(sourceArticles);
            } catch (Exception e) {
                // ログ出力（実際の実装では適切なログライブラリを使用）
                System.err.println("Error collecting from " + source + ": " + e.getMessage());
            }
        }
        
        return articles;
    }
    
    private List<NewsArticle> collectFromSource(String source, String industry, List<String> keywords) {
        List<NewsArticle> articles = new ArrayList<>();
        
        switch (source.toLowerCase()) {
            case "newsapi":
                articles = collectFromNewsAPI(industry, keywords);
                break;
            case "mock":
                articles = generateMockNews(industry, keywords);
                break;
            default:
                // デフォルトはモックデータ
                articles = generateMockNews(industry, keywords);
        }
        
        return articles;
    }
    
    private List<NewsArticle> collectFromNewsAPI(String industry, List<String> keywords) {
        // NewsAPIからの実際の収集（APIキーが必要）
        // ここではモックデータを返す
        return generateMockNews(industry, keywords);
    }
    
    private List<NewsArticle> generateMockNews(String industry, List<String> keywords) {
        List<NewsArticle> articles = new ArrayList<>();
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        
        // 業界とキーワードに基づいてモックニュースを生成
        String[] mockTitles = {
            industry + "業界で" + keywords.get(0) + "に関する新技術が発表",
            keywords.get(0) + "を活用した" + industry + "企業の成功事例",
            industry + "分野での" + keywords.get(0) + "導入が加速",
            keywords.get(0) + "関連の" + industry + "スタートアップが資金調達",
            industry + "業界の" + keywords.get(0) + "市場が拡大"
        };
        
        String[] mockCompanies = {
            "テックスタートアップ株式会社",
            "イノベーション企業",
            "デジタルソリューションズ",
            "フューチャーテック",
            "スマートビジネス"
        };
        
        for (int i = 0; i < 5; i++) {
            NewsArticle article = new NewsArticle(
                mockTitles[i % mockTitles.length],
                "これは" + industry + "業界における" + keywords.get(0) + "に関する詳細な記事です。" +
                mockCompanies[i % mockCompanies.length] + "が新しい取り組みを開始しました。",
                "https://example.com/news/" + (i + 1),
                currentTime,
                "Mock News Source"
            );
            articles.add(article);
        }
        
        return articles;
    }
}