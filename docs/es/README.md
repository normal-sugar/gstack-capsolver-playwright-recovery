# Recuperación Playwright con CapSolver para flujos de navegador gstack

[English](../../README.md) · [简体中文](../zh-CN/README.md) · [日本語](../ja/README.md) · [Español](README.md) · [Português](../pt-BR/README.md) · [한국어](../ko/README.md)

## Introducción

Un flujo de QA de un sitio propio o una automatización autorizada puede detenerse ante un control CAPTCHA. Este ejemplo detecta ese estado con Playwright, conserva el objetivo y la autorización, solicita una recuperación limitada a [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme) y entrega el control a una persona cuando vence cualquier límite.

Es un complemento independiente del flujo documentado por [gstack](https://github.com/garrytan/gstack): no modifica ni deriva gstack, no inventa una API de plugins y no afirma una colaboración oficial. La salida humana usa `snapshot`, `handoff` y `resume`.

## Inicio rápido

```bash
npm install
npm test
npm run smoke
```

Las pruebas son locales y no hacen solicitudes externas. En un entorno autorizado, configure `.env.example` y use únicamente campos del [contrato createTask de CapSolver](https://docs.capsolver.com/en/guide/api-createtask/).

## Controles

- Referencia de autorización escrita y lista de hosts antes de recuperar.
- Máximo de intentos, fecha límite y timeout fijos.
- Idempotencia por run ID y una sola reanudación.
- API real desactivada por defecto; cualquier resultado no listo termina en intervención humana.

Se verificaron los contratos de configuración; no se ejecutó una llamada API real ni una sesión real de gstack.

## Uso responsable

Úselo solo con datos públicos, sistemas propios o destinos con autorización escrita. Mantenga reducidos la lista de hosts, el presupuesto, la frecuencia y la recopilación, con una salida humana disponible. No recopile credenciales ni datos privados o restringidos, no oculte la automatización, no quebrante controles de acceso ni realice recopilación ilimitada. Los datos personales, financieros, sanitarios, laborales u otros sensibles requieren autorización específica, minimización, controles de acceso, auditoría y un plazo de conservación.

## Conclusión

Este repositorio aporta a los flujos de navegador de estilo gstack un complemento Playwright auditable: una recuperación autorizada, límites estrictos, reanudación idempotente y parada humana explícita con [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme).

## Maintainer Note

Developer sharing CapSolver integration examples.

## License

[MIT](../../LICENSE)
