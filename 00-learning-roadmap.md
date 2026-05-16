# Chromosphere 學習路線圖

本學習計劃帶你從整體架構到每個元件的設計細節，循序漸進地理解這個多框架元件庫的全貌。

---

## 章節索引

### 核心架構篇

| 章節 | 主題 | 核心概念 |
|------|------|---------|
| [Ch01](./01-monorepo-architecture.md) | Monorepo 架構總覽 | pnpm workspace、package 職責、tsconfig |
| [Ch02](./02-core-types.md) | Core 型別系統 | 框架無關介面、Anatomy 型別、types.ts |
| [Ch03](./03-anatomy-pattern.md) | Anatomy 模式 | data-part、Parts 定義、CSS 整合 |

### React 元件設計篇

| 章節 | 主題 | 核心概念 |
|------|------|---------|
| [Ch04](./04-react-context-pattern.md) | React Context 模式 | createContext、受控/非受控、兩層 Context |
| [Ch05](./05-react-component-design.md) | React 元件設計 | forwardRef、ComponentPropsWithoutRef、組合模式 |
| [Ch06](./06-aria-accessibility.md) | ARIA 無障礙設計 | WAI-ARIA、data-state、鍵盤導航 |
| [Ch07](./07-factory-polymorphic.md) | Factory 與 Polymorphic 元件 | as prop、asChild、Slot 模式 |
| [Ch08](./08-namespace-exports.md) | Namespace 匯出模式 | accordion.ts、index.ts、命名空間語法 |

### 跨框架與工具篇

| 章節 | 主題 | 核心概念 |
|------|------|---------|
| [Ch09](./09-multi-framework.md) | 多框架比較 | React vs Solid vs Vue vs Svelte |
| [Ch10](./10-gen-skeleton-script.md) | 骨架生成腳本 | gen-skeleton.mjs、程式碼生成 |

### 進階主題篇

| 章節 | 主題 | 核心概念 |
|------|------|---------|
| [Ch11](./11-testing-strategy.md) | 測試策略 | Testing Library、Playwright、ARIA 測試 |
| [Ch12](./12-performance-optimization.md) | 效能優化 | React.memo、useMemo、Context 分裂 |
| [Ch13](./13-animation.md) | 動畫整合 | CSS transition、Framer Motion、AnimatePresence |
| [Ch14](./14-storybook-docs.md) | Storybook 與文件自動化 | Stories、autodocs、a11y 插件 |
| [Ch15](./15-publishing-npm.md) | 發布 npm 套件 | tsup、Changesets、語意化版本 |

---

## 建議學習順序

```
Ch01 → Ch02 → Ch03
                ↓
        Ch04 → Ch05 → Ch06
                        ↓
               Ch07 → Ch08
                        ↓
               Ch09 → Ch10
                        ↓
        Ch11 → Ch12 → Ch13
                        ↓
               Ch14 → Ch15
```

---

## 這個 Repo 是什麼？

`chromosphere` 是一個**多框架無頭元件庫（Headless Component Library）**，設計理念對標 [Ark UI](https://ark-ui.com/) 和 [Radix UI](https://www.radix-ui.com/)。

**特點：**
- **框架無關的型別定義**：`@chromosphere/core` 定義所有元件的共用介面
- **多框架實作**：React、Vue、SolidJS、Svelte 各自實作同一套設計規格
- **無頭設計**：元件只負責行為與無障礙，不綁定樣式
- **學習用途**：所有元件骨架都是 TODO，包含詳細提示引導實作

**參考來源：**
- [Ark UI](https://github.com/chakra-ui/ark) — 多框架無頭元件庫
- [Zag.js](https://zagjs.com/) — 狀態機驅動的元件邏輯
- [Radix UI](https://www.radix-ui.com/) — React 無頭元件庫
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) — 無障礙設計規格
