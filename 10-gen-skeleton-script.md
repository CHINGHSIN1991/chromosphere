# Ch10：骨架生成腳本

## 關鍵知識點

- `gen-skeleton.mjs` 的工作原理與設計
- 程式碼生成（Code Generation）的設計模式
- Template Literal（模板字串）作為程式碼模板
- 如何新增一個全新的元件到這個 repo
- ESM（`.mjs`）腳本的執行方式

---

## 1. 骨架生成腳本是什麼？

檔案位置：[`scripts/gen-skeleton.mjs`](scripts/gen-skeleton.mjs)

這個腳本的功能：
> 根據預設的元件定義，自動生成所有元件在所有框架下的骨架檔案（包含 TODO 提示）。

換句話說，就是「這個 repo 是怎麼被創建出來的」。

**1800+ 行的腳本做了什麼：**
1. 定義 12 個元件的 anatomy（parts 清單）
2. 為每個元件，在每個 framework（React/Vue/Solid/Svelte）下生成骨架檔案
3. 為 `packages/core` 生成型別定義骨架
4. 生成 `anatomy.ts` 檔案
5. 生成測試骨架

---

## 2. 元件定義的資料結構

```javascript
// scripts/gen-skeleton.mjs
const components = [
  {
    name: 'accordion',
    description: '手風琴展開收合面板（多個可收合的內容區塊）',
    parts: ['root', 'item', 'item-trigger', 'item-content'],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    zagRef: 'https://zagjs.com/components/react/accordion',
  },
  {
    name: 'tabs',
    description: '分頁標籤元件',
    parts: ['root', 'list', 'trigger', 'content'],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/',
    zagRef: 'https://zagjs.com/components/react/tabs',
  },
  // ... 共 12 個元件
]
```

---

## 3. 模板函式的設計模式

### React Context 模板

```javascript
function genReactContext(componentName, contextFields) {
  return `
import { createContext, useContext } from 'react'

// TODO: 定義 ${componentName} 的 Context
export interface ${componentName}ContextValue {
${contextFields.map(f => `  ${f.name}: ${f.type}`).join('\n')}
}

export const ${componentName}Context = createContext<${componentName}ContextValue | null>(null)

export function use${componentName}Context(): ${componentName}ContextValue {
  const context = useContext(${componentName}Context)
  if (!context) {
    throw new Error('use${componentName}Context must be used within <${componentName}.Root>')
  }
  return context
}
`
}
```

### React Part 模板

```javascript
function genReactPart(componentName, partName, element, ariaHints) {
  return `
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// TODO: 實作 ${componentName}${partName}
export const ${componentName}${partName} = forwardRef<
  HTML${capitalize(element)}Element,
  ComponentPropsWithoutRef<'${element}'>
>((props, ref) => {
  // TODO: 從 Context 讀取狀態
  // TODO: 實作互動邏輯
  // TODO: 加上 ARIA 屬性：${ariaHints}
  return null
})

${componentName}${partName}.displayName = '${componentName}${partName}'
`
}
```

---

## 4. 生成流程

```javascript
// gen-skeleton.mjs 的主要流程
async function main() {
  for (const component of components) {
    // 1. 生成 Core 型別
    await writeFile(
      `packages/core/src/components/${component.name}/types.ts`,
      genCoreTypes(component)
    )

    // 2. 為每個 framework 生成骨架
    for (const framework of ['react', 'vue', 'solid', 'svelte']) {
      const dir = `packages/${framework}/src/components/${component.name}`

      // Context 檔案
      await writeFile(`${dir}/accordion-context.ts`, genContext(framework, component))

      // 每個 part 的檔案
      for (const part of component.parts) {
        const partName = toPascalCase(part)  // 'item-trigger' → 'ItemTrigger'
        const fileName = framework === 'svelte' || framework === 'vue'
          ? `${toPascalCase(component.name)}${partName}.${ext}`  // PascalCase for Svelte/Vue
          : `${component.name}-${part}.tsx`  // kebab-case for React/Solid

        await writeFile(`${dir}/${fileName}`, genPart(framework, component, part))
      }

      // Namespace 檔案和 index
      await writeFile(`${dir}/accordion.ts`, genNamespace(framework, component))
      await writeFile(`${dir}/index.ts`, genIndex(framework, component))
    }

    // 3. 生成 anatomy.ts（每個 framework package 各一份）
    await writeFile('packages/react/src/components/anatomy.ts', genAnatomyTs(components))
  }
}
```

---

## 5. 如何新增一個新元件

假設要新增一個 `Slider` 元件：

### Step 1：在 `components` 陣列中新增定義

```javascript
// scripts/gen-skeleton.mjs
const components = [
  // ... 現有元件 ...
  {
    name: 'slider',
    description: '滑桿輸入元件，允許在一個範圍內選擇數值',
    parts: ['root', 'label', 'track', 'range', 'thumb', 'value-text', 'hidden-input'],
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
    zagRef: 'https://zagjs.com/components/react/slider',
  },
]
```

### Step 2：執行生成腳本

```bash
node scripts/gen-skeleton.mjs
```

> ⚠️ 注意：腳本通常設計為**不覆蓋已存在的檔案**，避免覆蓋已完成的實作。

### Step 3：實作各框架版本

生成的骨架提供了：
- 元件結構（哪些 parts）
- TODO 提示（每一步要做什麼）
- 參考連結（ARIA 規格、Zag.js 機器等）

按照骨架的 TODO 指示，逐步實作各 part。

### Step 4：更新 `anatomy.ts`

```typescript
// packages/react/src/components/anatomy.ts
export const SLIDER_ANATOMY = ['root', 'label', 'track', 'range', 'thumb', 'value-text', 'hidden-input'] as const
export type SliderAnatomy = typeof SLIDER_ANATOMY[number]
```

### Step 5：更新 `index.ts`

```typescript
// packages/react/src/index.ts
export * from './components/slider'
```

---

## 6. `.mjs` 的意義

`.mjs` 副檔名明確告訴 Node.js：這個檔案使用 **ES Module** 語法（`import/export`），而不是 CommonJS（`require/module.exports`）。

```bash
# 執行 ESM 腳本
node scripts/gen-skeleton.mjs

# 不需要 --experimental-modules 旗標（Node 14+ 直接支援 .mjs）
```

在 `package.json` 中有 `"type": "module"` 的情況下，`.js` 也會被視為 ESM。但使用 `.mjs` 是更明確的表達方式。

---

## 7. 程式碼生成的設計原則

這個腳本展示了幾個程式碼生成的好實踐：

**1. 資料與模板分離**
- 元件定義（名稱、parts、描述）是資料
- 如何生成程式碼是模板函式

**2. 一致性**
- 所有框架使用相同的設計規範（TODO 格式、參考連結等）
- 保證骨架的一致性

**3. 可讀性優先**
- 生成的程式碼是「給人看的」，包含詳細的 TODO 提示
- 不是最小化的程式碼

**4. 冪等性（Idempotent）**
- 多次執行應該產生相同的結果
- 應避免覆蓋已有的實作

---

## 練習

1. 打開 [`scripts/gen-skeleton.mjs`](scripts/gen-skeleton.mjs)，找到 `genReactContext` 函式，理解它如何生成 context 骨架
2. 找到元件定義陣列，比較 Accordion 和 Dialog 的 parts 有什麼不同
3. 試著在定義中新增一個假想元件（如 `Slider`），然後執行腳本（注意：可能需要備份現有檔案）
4. 思考：為什麼要用腳本生成骨架，而不是直接手寫？（一致性、可擴展性）

---

## 延伸閱讀

- [Node.js ES Modules](https://nodejs.org/api/esm.html)
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Code Generation Patterns](https://martinfowler.com/articles/generative-ai-inner-loop.html)
- [Zag.js 的機器定義（Machine）](https://zagjs.com/overview/introduction)
