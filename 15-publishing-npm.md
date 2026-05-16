# Ch15：發布 npm 套件

## 關鍵知識點

- npm package 的 `exports` 欄位設計
- `package.json` 的 `main`、`module`、`types` 欄位
- 用 Vite 或 tsup 打包庫
- Semantic Versioning（語意化版本）
- Changesets 管理 monorepo 版本
- 發布前的 checklist

---

## 1. Package.json 關鍵欄位

### 現在的設定（開發模式）

目前 `packages/react/package.json` 的 exports 指向 `src`：

```json
{
  "exports": {
    ".": "./src/index.ts"
  }
}
```

這只適合在 monorepo **開發環境**中使用（TypeScript 直接讀 source）。

### 發布版本需要

```json
{
  "name": "@chromosphere/react",
  "version": "1.0.0",
  "type": "module",

  // 入口點設定
  "main": "./dist/index.cjs",        // CommonJS（給 Node.js 老系統）
  "module": "./dist/index.js",       // ESM（給現代打包工具）
  "types": "./dist/index.d.ts",      // TypeScript 型別

  // 現代打包工具使用的 exports 設定（優先於 main/module）
  "exports": {
    ".": {
      "import": "./dist/index.js",    // ESM import
      "require": "./dist/index.cjs",  // CommonJS require
      "types": "./dist/index.d.ts"    // 型別
    }
  },

  // 告訴 npm 哪些檔案要上傳
  "files": [
    "dist",
    "README.md"
  ],

  // Peer dependencies（讓使用者自己安裝）
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

---

## 2. 用 tsup 打包

[tsup](https://tsup.egoist.dev/) 是針對 TypeScript 庫設計的打包工具：

### 安裝

```bash
pnpm add -D tsup
```

### 設定

```typescript
// packages/react/tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],    // 同時輸出 ESM 和 CommonJS
  dts: true,                  // 生成 .d.ts 型別定義
  clean: true,                // 打包前清空 dist/
  sourcemap: true,            // 生成 sourcemap
  external: ['react', 'react-dom'],  // 不打包 peer dependencies
  treeshake: true,            // 移除未使用的程式碼
})
```

### 執行打包

```bash
cd packages/react
pnpm tsup
```

輸出：
```
dist/
├── index.js        ← ESM
├── index.cjs       ← CommonJS
├── index.d.ts      ← 型別定義
└── index.js.map    ← Sourcemap
```

---

## 3. Semantic Versioning（語意化版本）

版本號格式：`MAJOR.MINOR.PATCH`

| 版本號 | 意義 | 何時遞增 |
|--------|------|---------|
| `MAJOR` | 重大版本 | 有破壞性變更（Breaking Change） |
| `MINOR` | 次要版本 | 加入新功能（向後相容） |
| `PATCH` | 補丁版本 | Bug 修復（向後相容） |

範例：
- `1.0.0` → `2.0.0`：重構 API，不向後相容
- `1.0.0` → `1.1.0`：新增 `multiple` prop
- `1.0.0` → `1.0.1`：修復 focus 管理的 bug

---

## 4. Changesets 管理版本

[Changesets](https://github.com/changesets/changesets) 是 monorepo 中管理版本和 changelog 的工具。

### 安裝

```bash
pnpm add -D @changesets/cli
pnpm changeset init
```

### 工作流程

**1. 開發功能後，建立 changeset**

```bash
pnpm changeset
```

互動式問答：
- 選擇哪些 packages 有變更
- 選擇版本類型（major/minor/patch）
- 輸入變更描述

這會建立一個 `.changeset/` 目錄下的暫時檔案。

**2. 發布前，更新版本號**

```bash
pnpm changeset version
```

這會：
- 根據所有暫時 changeset 計算新版本號
- 更新各 package 的 `package.json`
- 自動生成 `CHANGELOG.md`

**3. 發布到 npm**

```bash
pnpm changeset publish
```

這會對所有版本有變化的 packages 執行 `npm publish`。

---

## 5. GitHub Actions 自動發布

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm --filter "./packages/*" build

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 6. 發布前 Checklist

```markdown
發布前確認：
- [ ] 所有測試通過：`pnpm test`
- [ ] TypeScript 無錯誤：`pnpm typecheck`
- [ ] 打包成功：`pnpm build`
- [ ] package.json exports 設定正確
- [ ] peerDependencies 版本範圍合理
- [ ] README 文件更新
- [ ] CHANGELOG 更新
- [ ] 版本號符合語意化版本規範
- [ ] 沒有把敏感資訊包進 npm 包
- [ ] 測試在乾淨環境安裝（`npm pack` 後在空目錄測試）
```

### 測試 npm pack

```bash
cd packages/react

# 模擬 npm publish，查看會上傳哪些檔案
npm pack --dry-run

# 實際打包成 .tgz 檔，可以在其他專案測試
npm pack
```

---

## 7. `.npmignore` vs `files`

**推薦用 `package.json` 的 `files` 欄位**（白名單），而不是 `.npmignore`（黑名單）：

```json
// package.json
{
  "files": [
    "dist",
    "README.md",
    "!dist/**/*.test.*"   // 排除測試檔案
  ]
}
```

預設情況下，npm 會排除 `node_modules`、`.git`、測試設定等。`files` 讓你明確指定要上傳的東西，更安全。

---

## 練習

1. 安裝 `tsup`，為 `packages/react` 建立打包設定
2. 執行 `pnpm tsup`，查看 `dist/` 目錄的輸出
3. 安裝 `@changesets/cli`，初始化 changesets
4. 執行 `npm pack --dry-run`，查看會上傳哪些檔案
5. 更新 `package.json` 的 `exports` 指向 `dist/`，確認本地安裝後能正常使用

---

## 延伸閱讀

- [tsup](https://tsup.egoist.dev/)
- [Changesets](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [npm package.json exports](https://nodejs.org/api/packages.html#exports)
- [Vite Library Mode](https://vitejs.dev/guide/build#library-mode)
