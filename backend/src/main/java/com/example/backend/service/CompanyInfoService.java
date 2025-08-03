package com.example.backend.service;

import com.example.backend.dto.CompanyInfo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CompanyInfoService {
    
    private final Map<String, CompanyInfo> companyDatabase = new HashMap<>();
    
    public CompanyInfoService() {
        initializeCompanyDatabase();
    }
    
    private void initializeCompanyDatabase() {
        // テックスタートアップ株式会社
        companyDatabase.put("テックスタートアップ株式会社", new CompanyInfo(
            "テックスタートアップ株式会社",
            "IT・ソフトウェア",
            "AI・機械学習技術を活用したソリューションを提供するスタートアップ企業",
            2020,
            "50-100名",
            "1億円-5億円",
            "東京都渋谷区",
            "https://techstartup.co.jp",
            "AI分析プラットフォーム、機械学習ツール、データ可視化ソフト",
            "2024年にシリーズAで3億円の資金調達を完了。AI技術の特許を2件取得。",
            "SaaS（Software as a Service）",
            "中小企業向けAIソリューション",
            "独自の機械学習アルゴリズムとクラウドネイティブアーキテクチャ",
            "AI市場の急成長により、年率150%の成長を継続中"
        ));
        
        // イノベーション企業
        companyDatabase.put("イノベーション企業", new CompanyInfo(
            "イノベーション企業",
            "IT・ソフトウェア",
            "革新的なデジタル技術で社会課題を解決する企業",
            2018,
            "100-200名",
            "5億円-10億円",
            "東京都新宿区",
            "https://innovation-company.com",
            "デジタル変革コンサルティング、DXプラットフォーム、IoTソリューション",
            "大手製造業とのDXプロジェクトで10億円規模の契約を獲得。",
            "コンサルティング + プロダクト開発",
            "大企業のDX推進",
            "豊富な業界知見と技術力の組み合わせ",
            "DX市場の拡大により、年率200%の成長を予測"
        ));
        
        // デジタルソリューションズ
        companyDatabase.put("デジタルソリューションズ", new CompanyInfo(
            "デジタルソリューションズ",
            "IT・ソフトウェア",
            "企業のデジタル化を支援する総合ITサービス企業",
            2015,
            "200-500名",
            "10億円-20億円",
            "東京都港区",
            "https://digital-solutions.co.jp",
            "クラウドサービス、システム開発、ITコンサルティング",
            "大手金融機関とのクラウド移行プロジェクトで15億円の契約を締結。",
            "システムインテグレーション + マネージドサービス",
            "金融・製造業界",
            "大手企業との実績と技術力",
            "クラウド市場の成長により、年率120%の成長を継続"
        ));
        
        // フューチャーテック
        companyDatabase.put("フューチャーテック", new CompanyInfo(
            "フューチャーテック",
            "AI・機械学習",
            "次世代AI技術の研究開発と実用化を推進する企業",
            2021,
            "30-50名",
            "1億円-3億円",
            "東京都品川区",
            "https://future-tech.ai",
            "AI研究開発、機械学習エンジン、自然言語処理ツール",
            "大手IT企業とのAI技術ライセンス契約で2億円を獲得。",
            "研究開発 + ライセンス",
            "AI技術を活用したい企業",
            "最先端のAI技術と特許ポートフォリオ",
            "AI市場の急成長により、年率300%の成長を予測"
        ));
        
        // スマートビジネス
        companyDatabase.put("スマートビジネス", new CompanyInfo(
            "スマートビジネス",
            "IT・ソフトウェア",
            "ビジネスプロセスの自動化と効率化を支援する企業",
            2019,
            "80-150名",
            "3億円-8億円",
            "東京都千代田区",
            "https://smart-business.co.jp",
            "業務自動化ツール、ワークフロー管理システム、RPAソリューション",
            "中堅企業向けRPA導入で年間売上を50%向上させる実績を達成。",
            "プロダクト + 導入支援",
            "中堅企業の業務効率化",
            "豊富な導入実績とカスタマイズ力",
            "RPA市場の拡大により、年率180%の成長を継続"
        ));
        
        // AIソリューションズ
        companyDatabase.put("AIソリューションズ", new CompanyInfo(
            "AIソリューションズ",
            "AI・機械学習",
            "企業向けAIソリューションの開発・提供を行う企業",
            2020,
            "60-120名",
            "2億円-6億円",
            "東京都中野区",
            "https://ai-solutions.co.jp",
            "AI予測分析、画像認識システム、チャットボット",
            "大手小売業とのAI予測分析導入で売上向上率30%を達成。",
            "AIソリューション開発 + 導入支援",
            "小売・製造業界",
            "業界特化型AIソリューション",
            "AI市場の成長により、年率250%の成長を予測"
        ));
        
        // クラウドテック
        companyDatabase.put("クラウドテック", new CompanyInfo(
            "クラウドテック",
            "クラウドサービス",
            "クラウドインフラとセキュリティソリューションを提供する企業",
            2017,
            "150-300名",
            "8億円-15億円",
            "東京都文京区",
            "https://cloud-tech.co.jp",
            "クラウドインフラ、セキュリティソリューション、マネージドサービス",
            "大手企業のクラウド移行プロジェクトで年間20億円の契約を獲得。",
            "クラウドサービス + セキュリティ",
            "大企業のクラウド移行",
            "豊富なクラウド実績とセキュリティ技術",
            "クラウド市場の成長により、年率160%の成長を継続"
        ));
        
        // データサイエンス企業
        companyDatabase.put("データサイエンス企業", new CompanyInfo(
            "データサイエンス企業",
            "データ分析",
            "ビッグデータ分析とデータドリブンな意思決定を支援する企業",
            2018,
            "40-80名",
            "2億円-5億円",
            "東京都目黒区",
            "https://data-science.co.jp",
            "データ分析プラットフォーム、BIツール、予測分析ソリューション",
            "大手製造業とのデータ分析プロジェクトで品質向上率40%を達成。",
            "データ分析 + コンサルティング",
            "製造・小売業界",
            "高度なデータ分析技術と業界知見",
            "データ分析市場の成長により、年率200%の成長を予測"
        ));
    }
    
    public CompanyInfo getCompanyInfo(String companyName) {
        return companyDatabase.get(companyName);
    }
    
    public boolean hasCompanyInfo(String companyName) {
        return companyDatabase.containsKey(companyName);
    }
    
    public Map<String, CompanyInfo> getAllCompanies() {
        return new HashMap<>(companyDatabase);
    }
}