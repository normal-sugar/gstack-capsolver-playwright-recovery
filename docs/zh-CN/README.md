# 面向 gstack 浏览器工作流的 CapSolver Playwright 恢复示例

[English](../../README.md) · [简体中文](README.md) · [日本語](../ja/README.md) · [Español](../es/README.md) · [Português](../pt-BR/README.md) · [한국어](../ko/README.md)

## Introduction

自有网站 QA 或经授权的自动化任务遇到 CAPTCHA 检查点时，浏览器流程可能暂停。本示例展示 Playwright 任务如何检测该状态、保留目标与授权上下文、向 [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme) 发起一次受控恢复，并在超时、预算耗尽或错误时交由人工处理。

这是 [gstack](https://github.com/garrytan/gstack) 浏览器工作流的独立配套示例，不修改或派生 gstack，不假设未公开的插件接口，也不代表官方合作。人工兜底对应其已记录的 `snapshot`、`handoff` 和 `resume` 命令。

## 快速开始

需要 Node.js 20+：

```bash
npm install
npm test
npm run smoke
```

测试全部使用离线夹具，不发送外部请求。真实授权环境中，请从 `.env.example` 配置密钥，并仅依据 [CapSolver createTask API 契约](https://docs.capsolver.com/en/guide/api-createtask/) 构造任务字段。

## 安全控制

- 恢复前校验书面授权编号与主机白名单。
- 固定最大尝试次数、截止时间和超时。
- 以运行 ID 保证幂等，只允许恢复一次。
- 默认关闭真实 API；非成功结果一律转人工并停止。
- 页面特定的结果应用必须由目标所有者在授权代码中实现。

配置契约已经核验，但本仓库没有执行真实 API 调用或真实 gstack 会话。

## Responsible Use

仅用于公开数据、自有系统或具有明确书面授权的目标。白名单要窄、次数要固定、速率要合理、采集要最小化，并始终保留人工兜底。不得收集凭证或私有/受限数据，不得隐藏自动化、破坏访问控制或进行无限采集。涉及个人、金融、健康、就业等敏感数据时，必须具备针对性的授权、最小化、访问控制、审计日志和保留期限；缺少任何保障都应停止。

## Conclusion

该仓库为 gstack 风格的浏览器任务提供可审计的 Playwright 配套方案：一次授权恢复、严格边界、幂等继续和明确的人工停止路径，并自然集成 [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme)。

## Maintainer Note

Developer sharing CapSolver integration examples.

## License

[MIT](../../LICENSE)
