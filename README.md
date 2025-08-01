# 日本酒おすすめアプリ 🍶

あなたの好みに合わせて、ぴったりの日本酒をおすすめするWebアプリケーションです。

## 機能

- **好みの入力**: 味わい、甘さ、酸味、価格、シーン、経験レベルを選択
- **日本酒推薦**: 入力された好みに基づいて最適な日本酒を推薦
- **詳細情報**: 各日本酒の詳細な情報、飲み方、料理との相性を表示
- **レスポンシブデザイン**: モバイル・デスクトップ両対応

## 技術スタック

### フロントエンド
- **Next.js 15**: React ベースのフルスタックフレームワーク
- **TypeScript**: 型安全性の確保
- **Tailwind CSS 4**: モダンなスタイリング
- **React 19**: 最新のReact機能

### バックエンド
- **Spring Boot**: Java ベースのWebアプリケーションフレームワーク
- **RESTful API**: 日本酒推薦API
- **Swagger**: API ドキュメント

## セットアップ

### 前提条件
- Node.js 18+
- Java 17+
- npm または yarn

### フロントエンドの起動

```bash
cd frontend
npm install
npm run dev
```

フロントエンドは `http://localhost:3000` で起動します。

### バックエンドの起動

```bash
cd backend
./mvnw spring-boot:run
```

バックエンドは `http://localhost:8080` で起動します。

## API エンドポイント

### 日本酒推薦
```
POST /api/sake/recommend
```

**リクエスト例:**
```json
{
  "flavor": "フルーティ",
  "sweetness": "中辛口",
  "acidity": "中程度",
  "price": "1000-3000円",
  "occasion": "晩酌",
  "experience": "中級者"
}
```

### 全日本酒取得
```
GET /api/sake/all
```

### 日本酒詳細取得
```
GET /api/sake/{id}
```

## 日本酒の種類

- **大吟醸**: 精米歩合50%以下。フルーティで華やかな香り
- **吟醸酒**: 精米歩合60%以下。上品で洗練された味わい
- **純米酒**: 米と麹のみで醸造。米の旨味が特徴
- **本醸造酒**: 醸造アルコールを添加。すっきりとした味わい

## 味わいの特徴

- **フルーティ**: 果実のような華やかな香り
- **すっきり**: 清涼感のある香り
- **上品**: 洗練された上品な香り
- **米の旨味**: 米の旨味が豊富
- **華やか**: 豊かな香りが特徴

## 開発

### フロントエンド開発
```bash
cd frontend
npm run dev
```

### バックエンド開発
```bash
cd backend
./mvnw spring-boot:run
```

### テスト
```bash
# フロントエンド
cd frontend
npm run test

# バックエンド
cd backend
./mvnw test
```

## デプロイ

### Vercel (フロントエンド)
```bash
cd frontend
vercel
```

### Railway (バックエンド)
```bash
cd backend
railway up
```

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します！

## 更新履歴

- v1.0.0: 初期リリース
  - 日本酒推薦機能
  - 好み入力フォーム
  - 詳細情報表示
  - レスポンシブデザイン
