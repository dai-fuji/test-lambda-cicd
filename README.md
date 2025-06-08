# Lambda CICD プロジェクト

このプロジェクトは、AWS SAM を使用して API Gateway と Lambda 関数を構築するためのテンプレートです。

## 構成

- `template.yaml` - SAM テンプレートファイル
- `src/` - Lambda 関数のソースコード
  - `app.js` - Lambda 関数のエントリーポイント
  - `package.json` - プロジェクト依存関係

## デプロイ方法

### 前提条件

- AWS CLI がインストールされていること
- AWS SAM CLI がインストールされていること
- AWS アカウントとアクセス権限が設定されていること

### ビルドとデプロイ

```bash
# ビルド
sam build

# デプロイ（ガイド付き）
sam deploy --guided
```

## ローカルでのテスト

```bash
# ローカルでLambda関数を起動
sam local invoke HelloWorldFunction

# ローカルでAPIを起動
sam local start-api
```

API にアクセスするには、ブラウザまたは curl で以下の URL にアクセスしてください：
http://localhost:3000/hello

## CI/CD ワークフロー

このプロジェクトには以下の GitHub Actions ワークフローが含まれています：

### 自動デプロイ (sam-deploy.yml)

`main` ブランチへのプッシュ時または手動実行で以下の処理を行います：

1. Lambda 関数をビルド・デプロイ
2. 新しいバージョンを発行し Test エイリアスを更新
3. 承認後に Prod エイリアスを更新

### Prod ロールバック (rollback-prod.yml)

手動トリガーでのみ実行可能なワークフローで、以下の処理を行います：

- Prod エイリアスを 1 つ前のバージョンに戻す
- 現在デプロイされているバージョンより古いバージョンが存在しない場合はエラーを表示

このワークフローは本番環境に問題が発生した場合の緊急対応として使用できます。
