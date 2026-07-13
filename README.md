# Chromosphere — 從零打造跨框架 Headless 元件庫

以 [Ark UI](https://ark-ui.com) / [Zag.js](https://zagjs.com) 為藍本，用 14 天循序漸進地學習並實作一個**跨框架（React / Vue / Solid）的 headless 元件庫**。

## 核心理念

Ark UI 之所以能跨框架，關鍵在於它的分層架構：

```
┌─────────────────────────────────────────────┐
│  使用者的 App（自己的樣式 + 我們的行為）        │
├─────────────────────────────────────────────┤
│  Framework Bindings（@chromosphere/react…） │  ← 薄薄的一層綁定
├─────────────────────────────────────────────┤
│  connect()：狀態 → props 的轉換層             │  ← 框架無關
├─────────────────────────────────────────────┤
│  State Machine Core（純 TypeScript）         │  ← 框架無關，邏輯全在這
└─────────────────────────────────────────────┘
```

- **邏輯下沉**：所有元件行為（開合、鍵盤導航、焦點管理）寫在純 TS 的狀態機裡，不依賴任何框架。
- **框架綁定極薄**：React/Vue/Solid 各自只負責「訂閱狀態機 + 把 props 掛到 DOM 上」。
- **零樣式**：只輸出行為與 `data-*` 屬性，樣式完全交給使用者。

## 14 天路線圖

| 天數 | 主題 | 產出 |
|------|------|------|
| [Day 1](./day-01-monorepo-setup.md) | 環境建置與 Monorepo 架構 | pnpm workspace + TS 專案骨架 |
| [Day 2](./day-02-headless-philosophy.md) | Headless 設計哲學與 Ark UI 架構解析 | 架構筆記、API 設計草稿 |
| [Day 3](./day-03-state-machine-core.md) | 狀態機核心（framework-agnostic） | `@chromosphere/core` 的 machine |
| [Day 4](./day-04-connect-layer.md) | connect() 與 prop getters | 狀態 → props 轉換層 |
| [Day 5](./day-05-anatomy-data-attrs.md) | Anatomy 與 data-* 樣式 API | anatomy 工具 + styling 約定 |
| [Day 6](./day-06-react-binding.md) | React 綁定層 | `useMachine`、`mergeProps`、`asChild` |
| [Day 7](./day-07-first-component.md) | 第一個完整元件：Accordion | 可用的 React Accordion |
| [Day 8](./day-08-accessibility.md) | 無障礙：ARIA、鍵盤、焦點 | 符合 WAI-ARIA APG 的元件 |
| [Day 9](./day-09-vue-binding.md) | Vue 綁定層 | 同一顆狀態機跑在 Vue 上 |
| [Day 10](./day-10-cross-framework.md) | 跨框架抽象：normalizeProps | Solid 綁定 + 抽象層收斂 |
| [Day 11](./day-11-overlay-components.md) | 浮層元件：Dialog / Popover | focus trap、dismiss、定位 |
| [Day 12](./day-12-testing.md) | 測試策略 | 單元 + 元件 + a11y 測試 |
| [Day 13](./day-13-docs-storybook.md) | 文件與 Storybook | 互動式元件文件 |
| [Day 14](./day-14-build-publish.md) | 打包與發佈 npm | 可安裝的 npm 套件 |

## 學習方法建議

1. **每天先讀「背景知識」再動手**：headless 元件庫的難點在觀念，不在程式量。
2. **對照原始碼**：每天都列了 Zag.js / Ark UI 對應的原始碼位置，寫完自己的版本後去對照，看差在哪。
3. **不求完美**：Day 3 的狀態機第一版可以很陽春，Day 7、Day 11 會回頭迭代它。
4. **堅持零框架依賴**：`core` 套件裡出現 `import react` 就是架構失守，這是每天都要檢查的紅線。

## 最終目標

14 天後你會有：

- `@chromosphere/core` — 純 TS 狀態機 + connect + anatomy
- `@chromosphere/react`、`@chromosphere/vue`、`@chromosphere/solid` — 三套框架綁定
- Accordion、Toggle、Dialog 三個元件，行為一致地跑在三個框架上
- 測試、文件、可發佈的 npm 套件
