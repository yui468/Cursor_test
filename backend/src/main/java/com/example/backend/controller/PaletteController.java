package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@Tag(name = "Palette", description = "色理論に基づくカラーパレット生成API")
@RestController
@RequestMapping("/api/palette")
public class PaletteController {
    @Operation(summary = "カラーパレットを生成",
            description = "baseColor（16進カラーコード）を元に、補色・類似色・トライアドなど色理論に基づいたパレットを返します。",
            parameters = {@Parameter(name = "baseColor", description = "基準となる色（例: #3B82F6）",
                    required = true)},
            responses = {@ApiResponse(responseCode = "200", description = "生成されたカラーパレット",
                    content = @Content(schema = @Schema(
                            example = "{\"palette\":[\"#3B82F6\",\"#C47D09\",\"#3BF6B8\",\"#3B5AF6\",\"#F63B82\",\"#82F63B\"]}")))})
    @GetMapping("/generate")
    public Map<String, Object> generatePalette(@RequestParam String baseColor) {
        // 色理論に基づいてパレットを生成（例：補色・類似色・トライアド）
        List<String> palette = new ArrayList<>();
        palette.add(baseColor);
        palette.add(getComplementaryColor(baseColor));
        palette.add(getAnalogousColor(baseColor, 30));
        palette.add(getAnalogousColor(baseColor, -30));
        palette.add(getTriadicColor(baseColor, 120));
        palette.add(getTriadicColor(baseColor, -120));
        Map<String, Object> result = new HashMap<>();
        result.put("palette", palette);
        return result;
    }

    // 補色
    private String getComplementaryColor(String hex) {
        int rgb = Integer.parseInt(hex.replace("#", ""), 16);
        int r = 255 - ((rgb >> 16) & 0xFF);
        int g = 255 - ((rgb >> 8) & 0xFF);
        int b = 255 - (rgb & 0xFF);
        return String.format("#%02X%02X%02X", r, g, b);
    }

    // 類似色
    private String getAnalogousColor(String hex, int angle) {
        float[] hsl = rgbToHsl(hexToRgb(hex));
        hsl[0] = (hsl[0] + angle + 360) % 360;
        return hslToHex(hsl);
    }

    // トライアド
    private String getTriadicColor(String hex, int angle) {
        float[] hsl = rgbToHsl(hexToRgb(hex));
        hsl[0] = (hsl[0] + angle + 360) % 360;
        return hslToHex(hsl);
    }

    private int[] hexToRgb(String hex) {
        hex = hex.replace("#", "");
        int r = Integer.parseInt(hex.substring(0, 2), 16);
        int g = Integer.parseInt(hex.substring(2, 4), 16);
        int b = Integer.parseInt(hex.substring(4, 6), 16);
        return new int[] {r, g, b};
    }

    private float[] rgbToHsl(int[] rgb) {
        float r = rgb[0] / 255f;
        float g = rgb[1] / 255f;
        float b = rgb[2] / 255f;
        float max = Math.max(r, Math.max(g, b));
        float min = Math.min(r, Math.min(g, b));
        float h = 0, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            float d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (max == r) {
                h = (g - b) / d + (g < b ? 6 : 0);
            } else if (max == g) {
                h = (b - r) / d + 2;
            } else if (max == b) {
                h = (r - g) / d + 4;
            }
            h *= 60;
        }
        return new float[] {h, s, l};
    }

    private String hslToHex(float[] hsl) {
        float h = hsl[0], s = hsl[1], l = hsl[2];
        float c = (1 - Math.abs(2 * l - 1)) * s;
        float x = c * (1 - Math.abs((h / 60) % 2 - 1));
        float m = l - c / 2;
        float r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        int ri = Math.round((r + m) * 255);
        int gi = Math.round((g + m) * 255);
        int bi = Math.round((b + m) * 255);
        return String.format("#%02X%02X%02X", ri, gi, bi);
    }
}
