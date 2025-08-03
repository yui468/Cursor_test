# Full-Stack Application

TypeScript + React/Next.js フロントエンドと Java + Spring Boot バックエンドのフルスタックアプリケーション

## 機能

### 🎨 カラーパレット作成ツール
- 色理論に基づいた美しいカラーパレットの自動生成
- パレットの保存・管理機能
- 直感的なカラー選択インターフェース

### 🤖 AI営業リスト作成エージェント
- Gemini AIを使用したニュース記事分析
- 営業対象企業の自動選定
- 関連性スコアによる優先度付け
- 営業条件に基づいたフィルタリング

## プロジェクト構成

```
project-root/
├── frontend/          # TypeScript + React/Next.js
├── backend/           # Java + Spring Boot
├── shared/            # 共有型定義など
└── docs/              # ドキュメント
    ├── DEVELOPMENT.md # 開発ルール・ガイドライン
    └── CONTRIBUTING.md # コントリビューションガイド
```

## セットアップ

### 環境変数の設定

営業エージェント機能を使用するには、Gemini APIキーを設定してください：

```bash
# backend/src/main/resources/application.properties または環境変数で設定
export GEMINI_API_KEY="your-gemini-api-key-here"
```

### フロントエンド (TypeScript + Next.js)

```bash
cd frontend
npm install
npm run dev
```

フロントエンドは http://localhost:3000 で起動します。

### バックエンド (Java + Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

バックエンドは http://localhost:8080 で起動します。

H2データベースコンソール: http://localhost:8080/h2-console

**Swagger API ドキュメント**: http://localhost:8080/swagger-ui.html

**営業エージェントAPI**: http://localhost:8080/api/sales-agent

## 開発

### フロントエンド開発

- Next.js 15.4.2
- React 19.1.0
- TypeScript
- Tailwind CSS

### バックエンド開発

- Spring Boot 3.2.0
- Java 17
- Spring Data JPA
- H2 Database (開発用)
- Spring Validation
- **Swagger/OpenAPI 3.0** - API ドキュメント自動生成
- **Google AI Client Libraries** - Gemini API統合
- **Spring WebFlux** - 非同期HTTP通信

## スクリプト

### 全体の開発サーバー起動

```bash
# バックエンド起動
cd backend && ./mvnw spring-boot:run &

# フロントエンド起動
cd frontend && npm run dev
```

## 技術スタック

### フロントエンド
- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS
- **Linting**: ESLint

### バックエンド
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: H2 (開発用)
- **ORM**: Spring Data JPA
- **Build Tool**: Maven
- **API Documentation**: Swagger/OpenAPI 3.0

## 開発ルール・ガイドライン

開発ルールとガイドラインは以下のドキュメントを参照してください：

- **[開発ルール・ガイドライン](docs/DEVELOPMENT.md)** - コーディング規約、Git運用、テスト方針など
- **[コントリビューションガイド](docs/CONTRIBUTING.md)** - 開発フロー、プルリクエスト、レビュープロセスなど
