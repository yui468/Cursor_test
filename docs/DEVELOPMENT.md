# 開発ルール・ガイドライン

## 目次
- [コーディング規約](#コーディング規約)
- [Git運用ルール](#git運用ルール)
- [ブランチ戦略](#ブランチ戦略)
- [コミットメッセージ規約](#コミットメッセージ規約)
- [レビュープロセス](#レビュープロセス)
- [テスト方針](#テスト方針)
- [デプロイメント](#デプロイメント)

## コーディング規約

### フロントエンド (TypeScript/React)

#### ファイル命名規則
- コンポーネント: `PascalCase` (例: `UserProfile.tsx`)
- フック: `camelCase` + `use` プレフィックス (例: `useUserData.ts`)
- ユーティリティ: `camelCase` (例: `formatDate.ts`)
- 定数: `UPPER_SNAKE_CASE` (例: `API_ENDPOINTS.ts`)

#### コンポーネント規約
```typescript
// 良い例
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  // 実装
};

// 悪い例
export default function userProfile(props: any) {
  // 実装
}
```

#### 型定義
- 必ず型を明示的に定義する
- `any` の使用は禁止
- インターフェースは `I` プレフィックスなし

### バックエンド (Java/Spring Boot)

#### パッケージ構成
```
com.example.backend/
├── controller/     # REST API コントローラー
├── service/        # ビジネスロジック
├── repository/     # データアクセス層
├── entity/         # JPA エンティティ
├── dto/           # データ転送オブジェクト
├── config/        # 設定クラス
└── exception/     # 例外処理
```

#### 命名規則
- クラス: `PascalCase` (例: `UserService`)
- メソッド: `camelCase` (例: `getUserById`)
- 定数: `UPPER_SNAKE_CASE` (例: `MAX_RETRY_COUNT`)
- パッケージ: `lowercase` (例: `com.example.backend.service`)

#### API設計規約
```java
@RestController
@RequestMapping("/api/v1/users")  // バージョニング必須
@Tag(name = "User Management")     // Swagger タグ必須
public class UserController {
    
    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")  // Swagger ドキュメント必須
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        // 実装
    }
}
```

## Git運用ルール

### ブランチ戦略
```
main (production)
├── develop (development)
│   ├── feature/user-management
│   ├── feature/payment-system
│   └── hotfix/critical-bug
└── release/v1.2.0
```

### ブランチ命名規則
- 機能開発: `feature/機能名` (例: `feature/user-authentication`)
- バグ修正: `fix/修正内容` (例: `fix/login-validation`)
- 緊急修正: `hotfix/修正内容` (例: `hotfix/security-vulnerability`)
- リリース: `release/バージョン` (例: `release/v1.2.0`)

### コミットメッセージ規約

#### 形式
```
<type>(<scope>): <日本語の説明>

<body>

<footer>
```

#### タイプ
- `feat`: 新機能追加
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイル修正（機能に影響なし）
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: ビルドプロセス・ツール修正
- `perf`: パフォーマンス改善
- `ci`: CI/CD設定変更

#### スコープ例
- `frontend`: フロントエンド関連
- `backend`: バックエンド関連
- `deploy`: デプロイ関連
- `config`: 設定関連
- `deps`: 依存関係関連

#### 例
```
feat(frontend): ユーザー認証システムを追加

- JWTトークン認証を実装
- ログイン・ログアウトエンドポイントを追加
- ユーザー登録フォームを作成

Closes #123
```

```
fix(backend): ログイン時のバリデーションエラーを修正

- メールアドレスの形式チェックを改善
- エラーメッセージを日本語化

Fixes #456
```

```
docs: 開発ルールドキュメントを更新

- コミットメッセージ規約を日本語化
- コーディング規約を詳細化
```

## レビュープロセス

### プルリクエスト作成時
1. **タイトル**: 簡潔で分かりやすいタイトル
2. **説明**: 変更内容の詳細説明
3. **チェックリスト**: 実装した項目の確認
4. **スクリーンショット**: UI変更がある場合

### レビュー観点
- [ ] コードの可読性
- [ ] パフォーマンスへの影響
- [ ] セキュリティの考慮
- [ ] テストの網羅性
- [ ] ドキュメントの更新

### レビューコメント
- 建設的で具体的なフィードバック
- 改善提案は具体的なコード例を含める
- 承認時は `LGTM` または `Approved` を使用

## テスト方針

### フロントエンド
- **Unit Test**: Jest + React Testing Library
- **Integration Test**: API との統合テスト
- **E2E Test**: Playwright または Cypress
- **カバレッジ**: 80% 以上を目標

### バックエンド
- **Unit Test**: JUnit 5 + Mockito
- **Integration Test**: @SpringBootTest
- **API Test**: REST Assured
- **カバレッジ**: 80% 以上を目標

### テストファイル命名
- フロントエンド: `ComponentName.test.tsx`
- バックエンド: `ClassNameTest.java`

## デプロイメント

### 環境
- **Development**: 開発環境
- **Staging**: ステージング環境
- **Production**: 本番環境

### デプロイメントルール
1. 本番デプロイは `main` ブランチからのみ
2. ステージングデプロイは `develop` ブランチから
3. デプロイ前のテスト実行必須
4. ロールバック手順の準備必須

### 環境変数管理
- 機密情報は環境変数で管理
- `.env.example` でテンプレート提供
- 本番環境の値は安全な方法で管理

## セキュリティガイドライン

### 認証・認可
- JWT トークンの適切な管理
- パスワードのハッシュ化
- ロールベースアクセス制御

### データ保護
- 個人情報の暗号化
- SQL インジェクション対策
- XSS 対策

### API セキュリティ
- HTTPS の使用
- レート制限の実装
- CORS 設定の適切な管理

## パフォーマンスガイドライン

### フロントエンド
- 画像の最適化
- コード分割（Code Splitting）
- キャッシュ戦略の実装

### バックエンド
- データベースクエリの最適化
- キャッシュの活用
- 非同期処理の適切な使用

## トラブルシューティング

### よくある問題と解決方法
1. **ビルドエラー**: `npm run build` または `mvn clean install`
2. **テスト失敗**: テスト環境の確認
3. **API エラー**: ログの確認とデバッグ

### ログ確認方法
- フロントエンド: ブラウザの開発者ツール
- バックエンド: アプリケーションログ

## 参考資料
- [TypeScript 公式ガイド](https://www.typescriptlang.org/docs/)
- [Spring Boot リファレンス](https://spring.io/projects/spring-boot)
- [Git コミットメッセージ規約](https://conventionalcommits.org/)