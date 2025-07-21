# Web アプリケーション開発プロジェクト

このプロジェクトは Next.js を使用したウェブアプリケーションです。

## 開発環境のセットアップ

### 必要条件

- Node.js (v22.17.1以上)
- npm (最新版)

### インストール手順

1. Node.jsのインストール
   - [Node.js公式サイト](https://nodejs.org/)からLTSバージョンをダウンロード
   - インストーラーを実行
   - インストール完了後、ターミナルで以下のコマンドを実行して確認：
     ```bash
     node --version
     ```

2. プロジェクトのセットアップ
   ```bash
   # プロジェクトディレクトリに移動
   cd web_app

   # 依存関係のインストール
   npm install
   ```

3. 開発サーバーの起動
   ```bash
   npm run dev
   ```
   サーバーが起動したら、ブラウザで http://localhost:3000 にアクセス

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全な JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
- [ESLint](https://eslint.org/) - コード品質管理

## プロジェクト構造

```
web_app/
├── src/
│   └── app/
│       ├── page.tsx      # メインページ
│       ├── layout.tsx    # 共通レイアウト
│       └── globals.css   # グローバルスタイル
├── public/              # 静的ファイル
├── package.json        # 依存関係の定義
└── tsconfig.json      # TypeScript設定
```

## 開発ワークフロー

1. 新しい機能の開発を始める前に、最新のコードを取得
2. `npm run dev` で開発サーバーを起動
3. コードの変更はホットリロードで即座に反映
4. ESLintによるコード品質の確認

## 利用可能なコマンド

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルドの作成
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - ESLintによるコード検証

## GitHub連携手順

1. GitHubでの準備
   - GitHubアカウントにログイン
   - 新しいリポジトリを作成
   - リポジトリ名: `web_app`（任意）
   - 説明を追加（オプション）
   - プライベート/パブリックを選択

2. ローカルリポジトリの設定
   ```bash
   # Gitリポジトリの初期化（済）
   git init

   # 変更をステージングに追加
   git add .

   # 最初のコミット
   git commit -m "Initial commit"

   # リモートリポジトリの追加
   git remote add origin https://github.com/あなたのユーザー名/web_app.git

   # メインブランチの名前を設定（必要な場合）
   git branch -M main

   # 変更をプッシュ
   git push -u origin main
   ```

3. 認証設定
   - GitHubでPersonal Access Tokenを生成
     1. GitHubの設定 → Developer settings → Personal access tokens → Tokens (classic)
     2. 「Generate new token」をクリック
     3. 必要な権限を選択（repo, workflow, admin:repo_hook）
     4. トークンを生成し、安全な場所に保存

4. 開発ワークフロー
   ```bash
   # 最新の変更を取得
   git pull origin main

   # 新しいブランチを作成
   git checkout -b 機能名

   # 変更を追加とコミット
   git add .
   git commit -m "変更の説明"

   # 変更をプッシュ
   git push origin 機能名
   ```
