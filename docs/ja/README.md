# gstack ブラウザワークフロー向け CapSolver Playwright リカバリー

[English](../../README.md) · [简体中文](../zh-CN/README.md) · [日本語](README.md) · [Español](../es/README.md) · [Português](../pt-BR/README.md) · [한국어](../ko/README.md)

## Introduction

所有サイトの QA や許可済み自動化では、CAPTCHA チェックポイントでブラウザ処理が停止することがあります。この例では Playwright が状態を検出し、目的と認可コンテキストを維持したまま [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme) に制限付きのリカバリーを一度だけ依頼し、失敗時は人へ引き継ぎます。

これは [gstack](https://github.com/garrytan/gstack) の独立したコンパニオンです。gstack の変更や派生ではなく、未公開プラグイン API や公式提携を主張しません。フォールバックは文書化された `snapshot`、`handoff`、`resume` に対応します。

## クイックスタート

```bash
npm install
npm test
npm run smoke
```

テストはオフラインのフィクスチャのみを使用します。本番では `.env.example` を使い、[CapSolver createTask API 契約](https://docs.capsolver.com/en/guide/api-createtask/) に存在するフィールドだけを設定してください。

## 安全設計

- 書面の認可参照とホスト許可リストを先に検証。
- 試行回数、期限、タイムアウトを固定。
- run ID による冪等性と一度だけの再開。
- 実 API は既定で無効。成功以外は停止して人に引き継ぐ。

設定契約は検証済みですが、実 API 呼び出しと実 gstack セッションは実行していません。

## Responsible Use

公開データ、所有システム、または明確な書面許可がある対象にのみ使用してください。許可リスト、予算、速度、収集範囲を最小にし、人の判断経路を維持します。認証情報や非公開・制限データを収集せず、自動化を隠したりアクセス制御を破ったり、無制限に収集したりしないでください。個人・金融・健康・雇用などの機微データには個別認可、最小化、アクセス制御、監査ログ、保持期限が必要です。

## Conclusion

このリポジトリは、許可された一度のリカバリー、厳格な上限、冪等な再開、人への明確な停止経路を備えた gstack 向け Playwright コンパニオンを [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme) とともに提供します。

## Maintainer Note

Developer sharing CapSolver integration examples.

## License

[MIT](../../LICENSE)
