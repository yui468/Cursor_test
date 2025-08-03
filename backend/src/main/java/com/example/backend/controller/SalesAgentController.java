package com.example.backend.controller;

import com.example.backend.dto.Prospect;
import com.example.backend.dto.SalesListRequest;
import com.example.backend.dto.SalesListResponse;
import com.example.backend.service.GeminiSalesAgentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/sales-agent")
@Tag(name = "Sales Agent", description = "営業リスト作成エージェントAPI")
@CrossOrigin(origins = "*")
public class SalesAgentController {
    
    @Autowired
    private GeminiSalesAgentService salesAgentService;
    
    @PostMapping("/generate-sales-list")
    @Operation(summary = "営業リスト生成", description = "ニュース記事を分析して営業リストを生成します")
    public ResponseEntity<SalesListResponse> generateSalesList(@RequestBody SalesListRequest request) {
        try {
            // 営業リストを生成
            List<Prospect> prospects = salesAgentService.generateSalesList(request);
            
            // レスポンスを作成
            String currentTime = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            String summary = String.format(
                "%s業界の%sに関連する企業%d件を営業リストとして生成しました。",
                request.getTargetIndustry(),
                String.join(", ", request.getTargetKeywords()),
                prospects.size()
            );
            
            SalesListResponse response = new SalesListResponse(
                prospects,
                prospects.size(),
                currentTime,
                summary
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("Error in generateSalesList: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/health")
    @Operation(summary = "ヘルスチェック", description = "営業エージェントの状態を確認します")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Sales Agent is running");
    }
    
    @GetMapping("/sample-request")
    @Operation(summary = "サンプルリクエスト", description = "営業リスト生成のサンプルリクエストを返します")
    public ResponseEntity<SalesListRequest> getSampleRequest() {
        SalesListRequest sampleRequest = new SalesListRequest(
            "IT・ソフトウェア",
            List.of("AI", "機械学習", "クラウド"),
            "startup",
            10,
            List.of("mock", "newsapi")
        );
        
        return ResponseEntity.ok(sampleRequest);
    }
}