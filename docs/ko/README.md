# gstack 브라우저 워크플로를 위한 CapSolver Playwright 복구

[English](../../README.md) · [简体中文](../zh-CN/README.md) · [日本語](../ja/README.md) · [Español](../es/README.md) · [Português](../pt-BR/README.md) · [한국어](README.md)

## 소개

소유 사이트 QA 또는 승인된 자동화 작업은 CAPTCHA 확인 지점에서 멈출 수 있습니다. 이 예제는 Playwright가 해당 상태를 감지하고 목표와 승인 컨텍스트를 보존하며 [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme)에 제한된 복구를 한 번 요청한 뒤 제한에 도달하면 사람에게 제어권을 넘기는 방법을 보여 줍니다.

이 프로젝트는 [gstack](https://github.com/garrytan/gstack) 문서의 브라우저 흐름을 위한 독립 companion입니다. gstack을 수정하거나 파생하지 않고, 공개되지 않은 플러그인 API 또는 공식 협력을 주장하지 않습니다. 사람 중심 fallback은 `snapshot`, `handoff`, `resume` 명령에 대응합니다.

## 빠른 시작

```bash
npm install
npm test
npm run smoke
```

테스트는 오프라인 fixture만 사용하며 외부 요청을 하지 않습니다. 승인된 실제 환경에서는 `.env.example`을 설정하고 [CapSolver createTask API 계약](https://docs.capsolver.com/en/guide/api-createtask/)에 있는 필드만 사용하세요.

## 제어 항목

- 복구 전에 서면 승인 참조와 호스트 허용 목록 검사.
- 최대 시도 수, 기한, timeout 고정.
- run ID 기반 멱등성과 단 한 번의 재개.
- 실제 API는 기본 비활성화. 준비되지 않은 결과는 사람에게 넘기고 중지.

구성 계약은 검증했지만 실제 API 호출이나 실제 gstack 세션은 실행하지 않았습니다.

## Responsible Use

공개 데이터, 소유 시스템 또는 명시적 서면 승인이 있는 대상에만 사용하세요. 허용 목록, 예산, 속도, 수집 범위를 최소화하고 사람의 fallback을 유지하세요. 자격 증명이나 비공개·제한 데이터를 수집하거나 자동화를 숨기거나 접근 통제를 훼손하거나 무제한 수집을 해서는 안 됩니다. 개인·금융·건강·고용 등 민감한 데이터에는 목적별 승인, 최소화, 접근 제어, 감사 로그, 보존 일정이 필요합니다.

## 결론

이 저장소는 승인된 한 번의 복구, 엄격한 제한, 멱등 재개, 명확한 사람 중지 경로를 갖춘 gstack 스타일 Playwright companion을 [CapSolver](https://www.capsolver.com/?utm_source=github&utm_medium=referral&utm_campaign=gstack-capsolver-playwright-recovery&utm_content=repository-readme)와 함께 제공합니다.

## Maintainer Note

Developer sharing CapSolver integration examples.

## License

[MIT](../../LICENSE)
