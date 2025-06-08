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
