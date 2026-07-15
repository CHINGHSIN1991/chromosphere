# Chromosphere — 從零打造跨框架 Headless 元件庫

以 [Ark UI](https://ark-ui.com) / [Zag.js](https://zagjs.com) 為藍本，實作一個**跨框架（React / Vue / Solid）的 headless 元件庫**。

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
- **堅持零框架依賴**：`core` 套件裡出現 `import react` 就是架構失守，這是不可跨越的紅線。

## 目標

- `@chromosphere/core` — 純 TS 狀態機 + connect + anatomy
- `@chromosphere/react`、`@chromosphere/vue`、`@chromosphere/solid` — 三套框架綁定
- Accordion、Toggle、Dialog 三個元件，行為一致地跑在三個框架上
- 測試、文件、可發佈的 npm 套件
