# Recuperação Playwright com CapSolver para fluxos de navegador gstack

[English](../../README.md) · [简体中文](../zh-CN/README.md) · [日本語](../ja/README.md) · [Español](../es/README.md) · [Português](README.md) · [한국어](../ko/README.md)

## Introdução

Um fluxo de QA em site próprio ou uma automação autorizada pode parar ao encontrar uma verificação CAPTCHA. Este exemplo detecta o estado com Playwright, preserva objetivo e autorização, solicita uma recuperação limitada ao [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme) e transfere o controle para uma pessoa quando algum limite é atingido.

É um companion independente do fluxo documentado pelo [gstack](https://github.com/garrytan/gstack): não modifica nem deriva o gstack, não inventa uma API de plugin e não afirma parceria oficial. O fallback humano usa `snapshot`, `handoff` e `resume`.

## Início rápido

```bash
npm install
npm test
npm run smoke
```

Os testes usam fixtures offline e não fazem solicitações externas. Em ambiente autorizado, configure `.env.example` e use somente campos do [contrato createTask do CapSolver](https://docs.capsolver.com/en/guide/api-createtask/).

## Controles

- Referência de autorização escrita e allowlist de hosts antes da recuperação.
- Máximo de tentativas, prazo e timeout fixos.
- Idempotência por run ID e apenas uma retomada.
- API real desativada por padrão; qualquer resultado não pronto encerra com fallback humano.

Os contratos de configuração foram verificados; nenhuma chamada API real ou sessão real do gstack foi executada.

## Uso responsável

Use apenas com dados públicos, sistemas próprios ou alvos com autorização escrita. Mantenha allowlist, orçamento, frequência e coleta mínimos, sempre com fallback humano. Não colete credenciais ou dados privados/restritos, não oculte a automação, não rompa controles de acesso e não faça coleta ilimitada. Dados pessoais, financeiros, de saúde, emprego ou outros sensíveis exigem autorização específica, minimização, controle de acesso, auditoria e prazo de retenção.

## Conclusão

Este repositório oferece aos fluxos de navegador no estilo gstack um companion Playwright auditável: uma recuperação autorizada, limites rígidos, retomada idempotente e parada humana explícita com [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme).

## Maintainer Note

Developer sharing CapSolver integration examples.

## License

[MIT](../../LICENSE)
