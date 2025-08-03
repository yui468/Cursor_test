# AI営業リスト作成エージェント

Gemini APIを使用してニュース記事を分析し、営業対象企業を自動で選定するAIエージェントです。

## 機能概要

### 🤖 AI営業リスト作成
- **ニュース記事分析**: 指定された業界・キーワードに関連するニュース記事を収集・分析
- **企業選定**: Gemini AIが記事内容を分析して営業対象企業を自動選定
- **関連性スコア**: 各企業の関連性を0.0-1.0のスコアで評価
- **選定理由**: AIが企業を選定した具体的な理由を提供

### 📊 営業条件設定
- **対象業界**: 営業対象とする業界を指定
- **キーワード**: 関連する技術・サービス・トレンドのキーワード
- **企業規模**: スタートアップ・中小企業・大企業から選択
- **最大件数**: 生成する営業リストの件数を指定
- **ニュースソース**: モックデータ・NewsAPIから選択

### 🎯 営業リスト表示
- **企業情報**: 企業名・業界・担当者情報
- **連絡先**: 推定メールアドレス・電話番号
- **関連性スコア**: 営業対象としての適性度
- **選定理由**: AIによる選定根拠
- **詳細モーダル**: 企業の詳細情報表示

## 技術構成

### バックエンド (Java + Spring Boot)
- **Spring Boot 3.2.0**: メインフレームワーク
- **Spring WebFlux**: 非同期HTTP通信
- **Gemini API**: Google AIによる自然言語処理
- **Swagger/OpenAPI**: API ドキュメント自動生成

### フロントエンド (TypeScript + Next.js)
- **Next.js 15.4.2**: React フレームワーク
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: モダンなUIデザイン
- **React Hooks**: 状態管理

## セットアップ

### 1. 環境変数の設定

```bash
# Gemini APIキーを設定
export GEMINI_API_KEY="your-gemini-api-key-here"
```

### 2. バックエンド起動

```bash
cd backend
./mvnw spring-boot:run
```

バックエンドは http://localhost:8080 で起動します。

### 3. フロントエンド起動

```bash
cd frontend
npm run dev
```

フロントエンドは http://localhost:3000 で起動します。

## 使用方法

### 1. 営業条件設定
1. メインページから「AI営業リスト作成エージェント」をクリック
2. 対象業界を入力（例: IT・ソフトウェア）
3. キーワードを追加（例: AI, 機械学習, クラウド）
4. 企業規模を選択（スタートアップ・中小企業・大企業）
5. 最大件数を設定（1-50件）
6. ニュースソースを選択

### 2. 営業リスト生成
1. 「営業リスト生成」ボタンをクリック
2. AIがニュース記事を分析して営業対象企業を選定
3. 生成された営業リストが表示される

### 3. 結果の確認
- 各企業の関連性スコアを確認
- 企業カードをクリックして詳細情報を表示
- 選定理由を参考に営業戦略を検討

## API エンドポイント

### 営業リスト生成
```
POST /api/sales-agent/generate-sales-list
```

**リクエスト例:**
```json
{
  "targetIndustry": "IT・ソフトウェア",
  "targetKeywords": ["AI", "機械学習", "クラウド"],
  "companySize": "startup",
  "maxProspects": 10,
  "newsSources": ["mock", "newsapi"]
}
```

**レスポンス例:**
```json
{
  "prospects": [
    {
      "companyName": "テックスタートアップ株式会社",
      "industry": "IT・ソフトウェア",
      "contactPerson": "田中太郎",
      "email": "contact@techstartup.com",
      "phone": "03-1234-1000",
      "relevanceScore": 0.85,
      "reasoning": "AIに関連する事業を展開しており、営業対象として適している",
      "newsSource": "Mock News Source"
    }
  ],
  "totalCount": 1,
  "generatedAt": "2024-01-01T12:00:00",
  "summary": "IT・ソフトウェア業界のAI, 機械学習, クラウドに関連する企業1件を営業リストとして生成しました。"
}
```

### ヘルスチェック
```
GET /api/sales-agent/health
```

### サンプルリクエスト取得
```
GET /api/sales-agent/sample-request
```

## 開発者向け情報

### プロジェクト構造
```
backend/
├── src/main/java/com/example/backend/
│   ├── config/
│   │   └── GeminiConfig.java          # Gemini API設定
│   ├── controller/
│   │   └── SalesAgentController.java  # 営業エージェントAPI
│   ├── dto/
│   │   ├── NewsArticle.java           # ニュース記事DTO
│   │   ├── Prospect.java              # 営業対象DTO
│   │   ├── SalesListRequest.java      # リクエストDTO
│   │   └── SalesListResponse.java     # レスポンスDTO
│   └── service/
│       ├── NewsCollectorService.java  # ニュース収集サービス
│       └── GeminiSalesAgentService.java # AI営業エージェントサービス

frontend/
├── src/app/
│   ├── components/
│   │   ├── SalesAgentForm.tsx         # 営業条件設定フォーム
│   │   └── SalesListDisplay.tsx       # 営業リスト表示
│   ├── sales-agent/
│   │   └── page.tsx                   # 営業エージェントページ
│   └── types/
│       └── sales.ts                   # 型定義
```

### カスタマイズポイント

#### ニュースソース追加
`NewsCollectorService.java`の`collectFromSource`メソッドに新しいニュースソースを追加できます。

#### AIプロンプト調整
`GeminiSalesAgentService.java`の`createAnalysisPrompt`メソッドでAIへの指示を調整できます。

#### UI/UX改善
`SalesAgentForm.tsx`と`SalesListDisplay.tsx`でユーザーインターフェースをカスタマイズできます。

## 今後の拡張予定

- [ ] 実際のニュースAPI（NewsAPI, RSS）との連携
- [ ] 営業活動の記録・管理機能
- [ ] 営業結果の分析・レポート機能
- [ ] 複数のAIモデル（GPT-4, Claude等）の選択
- [ ] 営業メールの自動生成機能
- [ ] 企業情報の詳細取得（LinkedIn, 企業データベース等）

## トラブルシューティング

### Gemini APIキーが設定されていない場合
- 環境変数`GEMINI_API_KEY`が正しく設定されているか確認
- モックデータを使用して動作確認

### API呼び出しエラー
- バックエンドが正常に起動しているか確認
- Swagger UI (http://localhost:8080/swagger-ui.html) でAPI動作確認

### フロントエンドエラー
- ブラウザの開発者ツールでエラーログを確認
- ネットワークタブでAPI呼び出し状況を確認

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。