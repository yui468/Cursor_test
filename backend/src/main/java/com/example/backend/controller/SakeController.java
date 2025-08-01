package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@Tag(name = "Sake", description = "日本酒推薦API")
@RestController
@RequestMapping("/api/sake")
@CrossOrigin(origins = "*")
public class SakeController {

    @Operation(summary = "日本酒を推薦",
            description = "ユーザーの好みに基づいて日本酒を推薦します",
            responses = {@ApiResponse(responseCode = "200", description = "推薦された日本酒のリスト")})
    @PostMapping("/recommend")
    public Map<String, Object> recommendSake(@RequestBody Map<String, String> preferences) {
        List<Map<String, Object>> recommendations = generateRecommendations(preferences);
        
        Map<String, Object> result = new HashMap<>();
        result.put("recommendations", recommendations);
        result.put("count", recommendations.size());
        return result;
    }

    @Operation(summary = "日本酒の詳細情報を取得",
            description = "指定された日本酒の詳細情報を取得します")
    @GetMapping("/{id}")
    public Map<String, Object> getSakeDetails(@PathVariable String id) {
        return getSakeById(id);
    }

    @Operation(summary = "全ての日本酒を取得",
            description = "データベース内の全ての日本酒を取得します")
    @GetMapping("/all")
    public Map<String, Object> getAllSakes() {
        List<Map<String, Object>> allSakes = getAllSakeData();
        
        Map<String, Object> result = new HashMap<>();
        result.put("sakes", allSakes);
        result.put("count", allSakes.size());
        return result;
    }

    private List<Map<String, Object>> generateRecommendations(Map<String, String> preferences) {
        List<Map<String, Object>> allSakes = getAllSakeData();
        List<Map<String, Object>> recommendations = new ArrayList<>();
        
        String flavor = preferences.get("flavor");
        String sweetness = preferences.get("sweetness");
        String price = preferences.get("price");
        String experience = preferences.get("experience");
        
        // 好みに基づいてフィルタリング
        for (Map<String, Object> sake : allSakes) {
            boolean matches = true;
            
            // 味わいでフィルタリング
            if (flavor != null && !flavor.isEmpty()) {
                String sakeFlavor = (String) sake.get("flavor");
                if (!flavor.equals(sakeFlavor)) {
                    matches = false;
                }
            }
            
            // 甘さでフィルタリング
            if (sweetness != null && !sweetness.isEmpty()) {
                String sakeSweetness = (String) sake.get("sweetness");
                if (!sweetness.equals(sakeSweetness)) {
                    matches = false;
                }
            }
            
            // 価格でフィルタリング
            if (price != null && !price.isEmpty()) {
                String sakePrice = (String) sake.get("price");
                if (!isPriceInRange(sakePrice, price)) {
                    matches = false;
                }
            }
            
            // 経験レベルに基づく調整
            if (experience != null && !experience.isEmpty()) {
                if ("初心者".equals(experience)) {
                    // 初心者には辛口や高級酒を避ける
                    String sakeSweetness = (String) sake.get("sweetness");
                    String sakePrice = (String) sake.get("price");
                    if ("辛口".equals(sakeSweetness) || sakePrice.contains("5000円以上")) {
                        matches = false;
                    }
                }
            }
            
            if (matches) {
                recommendations.add(sake);
            }
        }
        
        // 最大3つまで返す
        return recommendations.subList(0, Math.min(recommendations.size(), 3));
    }

    private boolean isPriceInRange(String sakePrice, String userPrice) {
        if (sakePrice == null || userPrice == null) return true;
        
        try {
            int sakePriceValue = extractPriceValue(sakePrice);
            int userPriceValue = extractPriceValue(userPrice);
            
            switch (userPrice) {
                case "1000円以下":
                    return sakePriceValue <= 1000;
                case "1000-3000円":
                    return sakePriceValue >= 1000 && sakePriceValue <= 3000;
                case "3000-5000円":
                    return sakePriceValue >= 3000 && sakePriceValue <= 5000;
                case "5000円以上":
                    return sakePriceValue >= 5000;
                default:
                    return true;
            }
        } catch (Exception e) {
            return true;
        }
    }

    private int extractPriceValue(String price) {
        // "¥8,000" のような文字列から数値を抽出
        String numeric = price.replaceAll("[^0-9]", "");
        return Integer.parseInt(numeric);
    }

    private Map<String, Object> getSakeById(String id) {
        List<Map<String, Object>> allSakes = getAllSakeData();
        for (Map<String, Object> sake : allSakes) {
            if (id.equals(sake.get("id"))) {
                return sake;
            }
        }
        return new HashMap<>();
    }

    private List<Map<String, Object>> getAllSakeData() {
        List<Map<String, Object>> sakes = new ArrayList<>();
        
        // 獺祭 純米大吟醸
        Map<String, Object> sake1 = new HashMap<>();
        sake1.put("id", "1");
        sake1.put("name", "獺祭 純米大吟醸 磨き二割三分");
        sake1.put("brewery", "旭酒造");
        sake1.put("prefecture", "山口県");
        sake1.put("type", "純米大吟醸");
        sake1.put("ricePolishingRatio", "23%");
        sake1.put("alcoholContent", "16%");
        sake1.put("flavor", "フルーティ");
        sake1.put("aroma", "華やか");
        sake1.put("sweetness", "中辛口");
        sake1.put("acidity", "中程度");
        sake1.put("umami", "豊富");
        sake1.put("description", "精米歩合23%という極限まで磨いた米で醸造された高級純米大吟醸。フルーティで華やかな香りと、上品で洗練された味わいが特徴です。");
        sake1.put("price", "¥8,000");
        sake1.put("imageUrl", "/api/placeholder/300/200");
        sake1.put("tags", Arrays.asList("高級", "フルーティ", "華やか"));
        sakes.add(sake1);

        // 久保田 千寿
        Map<String, Object> sake2 = new HashMap<>();
        sake2.put("id", "2");
        sake2.put("name", "久保田 千寿");
        sake2.put("brewery", "朝日酒造");
        sake2.put("prefecture", "新潟県");
        sake2.put("type", "本醸造酒");
        sake2.put("ricePolishingRatio", "65%");
        sake2.put("alcoholContent", "15%");
        sake2.put("flavor", "すっきり");
        sake2.put("aroma", "清涼");
        sake2.put("sweetness", "辛口");
        sake2.put("acidity", "低め");
        sake2.put("umami", "控えめ");
        sake2.put("description", "新潟の水と米の特徴を活かした、すっきりとした辛口の本醸造酒。清涼感のある香りと、後味のすっきりとした飲み口が特徴です。");
        sake2.put("price", "¥1,200");
        sake2.put("imageUrl", "/api/placeholder/300/200");
        sake2.put("tags", Arrays.asList("辛口", "すっきり", "清涼"));
        sakes.add(sake2);

        // 八海山 純米吟醸
        Map<String, Object> sake3 = new HashMap<>();
        sake3.put("id", "3");
        sake3.put("name", "八海山 純米吟醸");
        sake3.put("brewery", "八海醸造");
        sake3.put("prefecture", "新潟県");
        sake3.put("type", "純米吟醸");
        sake3.put("ricePolishingRatio", "55%");
        sake3.put("alcoholContent", "15%");
        sake3.put("flavor", "上品");
        sake3.put("aroma", "吟醸香");
        sake3.put("sweetness", "中辛口");
        sake3.put("acidity", "中程度");
        sake3.put("umami", "バランス");
        sake3.put("description", "新潟県の名水と良質な米を使用した純米吟醸。上品な吟醸香と、バランスの取れた味わいが特徴です。");
        sake3.put("price", "¥2,500");
        sake3.put("imageUrl", "/api/placeholder/300/200");
        sake3.put("tags", Arrays.asList("上品", "吟醸香", "バランス"));
        sakes.add(sake3);

        // 白鶴 特別純米
        Map<String, Object> sake4 = new HashMap<>();
        sake4.put("id", "4");
        sake4.put("name", "白鶴 特別純米");
        sake4.put("brewery", "白鶴酒造");
        sake4.put("prefecture", "兵庫県");
        sake4.put("type", "特別純米酒");
        sake4.put("ricePolishingRatio", "60%");
        sake4.put("alcoholContent", "15%");
        sake4.put("flavor", "米の旨味");
        sake4.put("aroma", "米香");
        sake4.put("sweetness", "中辛口");
        sake4.put("acidity", "中程度");
        sake4.put("umami", "豊富");
        sake4.put("description", "米と麹のみで醸造された特別純米酒。米の旨味が豊富で、温めても冷やしても美味しく飲めます。");
        sake4.put("price", "¥1,800");
        sake4.put("imageUrl", "/api/placeholder/300/200");
        sake4.put("tags", Arrays.asList("米の旨味", "温冷両用", "豊富"));
        sakes.add(sake4);

        // 月桂冠 大吟醸
        Map<String, Object> sake5 = new HashMap<>();
        sake5.put("id", "5");
        sake5.put("name", "月桂冠 大吟醸");
        sake5.put("brewery", "月桂冠");
        sake5.put("prefecture", "京都府");
        sake5.put("type", "大吟醸");
        sake5.put("ricePolishingRatio", "50%");
        sake5.put("alcoholContent", "16%");
        sake5.put("flavor", "華やか");
        sake5.put("aroma", "吟醸香");
        sake5.put("sweetness", "甘口");
        sake5.put("acidity", "低め");
        sake5.put("umami", "豊富");
        sake5.put("description", "京都の伝統的な醸造技術で作られた大吟醸。華やかな香りと甘みのある味わいが特徴です。");
        sake5.put("price", "¥4,500");
        sake5.put("imageUrl", "/api/placeholder/300/200");
        sake5.put("tags", Arrays.asList("甘口", "華やか", "伝統"));
        sakes.add(sake5);

        // 日本盛 本醸造
        Map<String, Object> sake6 = new HashMap<>();
        sake6.put("id", "6");
        sake6.put("name", "日本盛 本醸造");
        sake6.put("brewery", "日本盛");
        sake6.put("prefecture", "兵庫県");
        sake6.put("type", "本醸造酒");
        sake6.put("ricePolishingRatio", "70%");
        sake6.put("alcoholContent", "15%");
        sake6.put("flavor", "すっきり");
        sake6.put("aroma", "清涼");
        sake6.put("sweetness", "辛口");
        sake6.put("acidity", "中程度");
        sake6.put("umami", "控えめ");
        sake6.put("description", "すっきりとした辛口の本醸造酒。日常的に飲みやすい価格と味わいが特徴です。");
        sake6.put("price", "¥800");
        sake6.put("imageUrl", "/api/placeholder/300/200");
        sake6.put("tags", Arrays.asList("辛口", "すっきり", "日常"));
        sakes.add(sake6);

        return sakes;
    }
}