# Ch01：Monorepo 架構總覽

## 關鍵知識點

- pnpm workspace 的設定與用途
- Monorepo 中各 package 的職責劃分
- TypeScript 的根設定與各包繼承方式
- 「框架無關」設計的核心動機

---

## 1. 什麼是 Monorepo？

`chromosphere` 是一個 **monorepo**：在同一個 Git 倉庫中管理多個相互關聯的套件。

```
chromosphere/
├── packages/        ← 所有可發布的套件
│   ├── core/        ← @chromosphere/core
│   ├── react/       ← @chromosphere/react
│   ├── solid/       ← @chromosphere/solid
│   ├── svelte/      ← @chromosphere/svelte
│   └── vue/         ← @chromosphere/vue
├── playground/      ← 開發測試用的應用
│   └── react/       ← React 示範應用
└── scripts/         ← 工具腳本
    └── gen-skeleton.mjs
```

---

## 2. pnpm workspace

### `pnpm-workspace.yaml`

```yaml
packages:
  - 'packages/*'
  - 'playground/*'
```

這告訴 pnpm：`packages/` 和 `playground/` 下的每個子目錄都是一個獨立的 workspace package。

**優點：**
- 各 package 可以互相依賴（用 workspace: 協議）
- 只需在根目錄執行一次 `pnpm install`
- 避免重複安裝相同的 node_modules

### 查看 package 間的依賴

打開任一 framework package（如 `packages/react/package.json`）：

```json
{
  "dependencies": {
    "@chromosphere/core": "workspace:*"
  }
}
```

`workspace:*` 表示使用本地 monorepo 中的 core 套件，而不是從 npm 下載。

---

## 3. 各 Package 的職責

### `@chromosphere/core`

- **職責**：定義所有元件的**框架無關型別介面**
- **不包含**：任何框架相關程式碼（沒有 React hooks、Vue ref 等）
- **包含**：TypeScript interface、const 定義、Anatomy 常數

```
packages/core/src/
├── index.ts                    ← 統一匯出
└── components/
    ├── accordion/types.ts      ← Accordion 型別
    ├── avatar/types.ts
    ├── checkbox/types.ts
    └── ...（11 個元件）
```

### `@chromosphere/react`

- **職責**：用 React 實作所有元件
- **依賴**：`@chromosphere/core`（取得型別定義）
- **特性**：使用 `useState`、`createContext`、`forwardRef` 等 React API

### `@chromosphere/solid`

- **職責**：用 SolidJS 實作所有元件
- **特性**：使用 `createSignal`、`createContext`、`splitProps` 等 Solid API

### `@chromosphere/svelte`

- **職責**：用 Svelte 5 實作所有元件
- **特性**：使用 `$state` rune、`setContext/getContext`、`.svelte` 檔案

### `@chromosphere/vue`

- **職責**：用 Vue 3 實作所有元件
- **特性**：使用 `ref`、`provide/inject`、`<script setup>` Composition API

---

## 4. TypeScript 設定

### 根目錄 `tsconfig.json`（全局基礎設定）

關鍵設定：
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true
  }
}
```

- `strict: true` — 開啟所有嚴格型別檢查
- `jsx: "react-jsx"` — 使用 React 17+ 的新 JSX Transform（不需要 `import React`）

### 各 Package 的 `tsconfig.json`

每個 package 都有自己的 tsconfig，通常繼承根目錄設定：

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "paths": {
      "@chromosphere/core": ["../core/src/index.ts"]
    }
  }
}
```

`paths` 讓 TypeScript 知道如何解析本地 workspace package 的型別。

---

## 5. 整體設計理念

### 為什麼要「框架無關」？

同一個 Accordion 元件邏輯在 React、Vue、Solid、Svelte 中是一樣的：
- 管理哪個 item 是展開的（`value: string[]`）
- 控制是否允許多個 item 同時展開（`multiple: boolean`）
- 提供展開/收合的切換函式

但**狀態管理的 API** 在每個框架中不同：
- React：`useState`、`createContext`
- Solid：`createSignal`、`createContext`
- Vue：`ref`、`provide/inject`
- Svelte：`$state`、`setContext`

所以 `@chromosphere/core` 只定義「應該有什麼」，各框架 package 決定「怎麼做到」。

---

## 練習

1. 打開 `pnpm-workspace.yaml`，確認 workspace 設定
2. 打開 `packages/react/package.json`，找到對 `@chromosphere/core` 的依賴
3. 比較 `packages/core/tsconfig.json` 和 `packages/react/tsconfig.json` 的差異
4. 查看 `packages/core/src/index.ts`，了解它匯出了哪些型別

---

## 延伸閱讀

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Ark UI Monorepo 結構](https://github.com/chakra-ui/ark)
