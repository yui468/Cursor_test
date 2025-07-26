# Full-Stack Application

TypeScript + React/Next.js フロントエンドと Java + Spring Boot バックエンドのフルスタックアプリケーション

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
