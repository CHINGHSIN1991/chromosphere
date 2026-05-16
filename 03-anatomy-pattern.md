# Ch03：Anatomy 模式

## 關鍵知識點

- Anatomy（解剖結構）概念的由來與用途
- `anatomy.ts` 的設計
- `data-part` 屬性如何讓 CSS 精準定位
- Anatomy 與 `data-state` 的搭配
- Zag.js 的 `@zag-js/anatomy` 套件

---

## 1. 什麼是 Anatomy？

「Anatomy」在元件庫的語境中，指的是**一個元件由哪些可辨識的部分（parts）組成**。

以 Accordion 為例，它的 Anatomy 是：
```
Accordion
├── Root        ← 最外層容器
├── Item        ← 單一項目（可有多個）
│   ├── ItemTrigger   ← 點擊觸發展開的按鈕
│   └── ItemContent   ← 可收合的內容
```

這個概念的靈感來自設計系統和 UI 文件化工具，讓設計師和開發者用同一套語言討論元件結構。

---

## 2. `anatomy.ts` 的設計

檔案位置：[`packages/react/src/components/anatomy.ts`](packages/react/src/components/anatomy.ts)

（每個 framework package 都有一個相同的 anatomy.ts）

```typescript
export const ACCORDION_ANATOMY = ['root', 'item', 'item-trigger', 'item-content'] as const
export type AccordionAnatomy = typeof ACCORDION_ANATOMY[number]
```

### 型別解析

```typescript
// typeof ACCORDION_ANATOMY 是：
// readonly ['root', 'item', 'item-trigger', 'item-content']

// typeof ACCORDION_ANATOMY[number] 是：
// 'root' | 'item' | 'item-trigger' | 'item-content'
```

`[number]` 是 TypeScript 的**索引存取型別**，用來從陣列型別中取出所有可能的值型別，形成 union。

---

## 3. `data-part` 屬性

每個元件的每個 part 在渲染時都會加上 `data-part` 屬性：

```tsx
// AccordionRoot 渲染
<div data-part="root" data-state="open">
  {/* AccordionItem 渲染 */}
  <div data-part="item" data-state="open">
    {/* AccordionItemTrigger 渲染 */}
    <button data-part="item-trigger" aria-expanded="true">
      標題
    </button>
    {/* AccordionItemContent 渲染 */}
    <div data-part="item-content">
      內容
    </div>
  </div>
</div>
```

### 為什麼用 `data-part` 而不是 `className`？

**傳統 className 方式（BEM）：**
```css
.accordion__root { }
.accordion__item { }
.accordion__item-trigger { }
.accordion__item-content { }
```

問題：需要使用者記住特定的 class 命名規則，容易與自訂樣式衝突。

**`data-part` 方式：**
```css
[data-part="root"] { }
[data-part="item"] { }
[data-part="item-trigger"] { }
[data-part="item-content"] { }
```

優點：
- 不依賴 class 命名，更穩定
- 可以用 attribute selector 精準定位
- 與使用者的 className 不衝突

---

## 4. `data-state` 屬性

`data-state` 是另一個重要的 data 屬性，用來反映元件的**當前狀態**：

```tsx
// 展開時
<div data-part="root" data-state="open">

// 收合時
<div data-part="root" data-state="closed">

// 禁用時
<button data-part="item-trigger" data-disabled="">
```

### CSS 整合範例

```css
/* 展開狀態的內容區域 */
[data-part="item-content"][data-state="open"] {
  height: auto;
}

/* 收合狀態的內容區域 */
[data-part="item-content"][data-state="closed"] {
  height: 0;
  overflow: hidden;
}

/* 禁用的觸發按鈕 */
[data-part="item-trigger"][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

這正是 [`playground/react/src/App.css`](playground/react/src/App.css) 中使用的方式：

```css
.styled-demo [data-state="open"] > [data-part="item-content"] {
  /* 展開時的動畫 */
}
```

---

## 5. Anatomy 的完整清單

從 [`packages/react/src/components/anatomy.ts`](packages/react/src/components/anatomy.ts) 可以看到所有元件的 anatomy：

| 元件 | Parts |
|------|-------|
| Accordion | root, item, item-trigger, item-content |
| Tabs | root, list, trigger, content |
| Dialog | root, trigger, backdrop, positioner, content, title, description, close-trigger |
| Popover | root, trigger, anchor, positioner, content, title, description, close-trigger, arrow, arrow-tip |
| Tooltip | root, trigger, positioner, content, arrow, arrow-tip |
| Checkbox | root, label, control, indicator, hidden-input |
| Switch | root, label, control, thumb, hidden-input |
| Select | root, label, trigger, value-text, indicator, positioner, content, item, item-text, item-indicator, item-group, item-group-label |
| RadioGroup | root, label, item, item-control, item-text, item-hidden-input |
| Avatar | root, image, fallback |
| Progress | root, label, track, range, value-text |

---

## 6. Zag.js 的 `@zag-js/anatomy`

這個 repo 的 anatomy 設計受到 [Zag.js](https://zagjs.com/) 的 `@zag-js/anatomy` 套件啟發。

Zag.js 的做法是：

```typescript
import { createAnatomy } from '@zag-js/anatomy'

const anatomy = createAnatomy('accordion').parts(
  'root', 'item', 'item-trigger', 'item-content'
)
```

`createAnatomy` 可以自動生成 `selector`（CSS 選擇器）、`className` 等輔助工具，讓元件庫的使用者更方便整合樣式。

這個 repo 的 `anatomy.ts` 是簡化版本：只定義 parts，不包含自動生成工具（可以作為進階功能自行實作）。

---

## 練習

1. 打開 [`packages/react/src/components/anatomy.ts`](packages/react/src/components/anatomy.ts)，閱讀所有元件的 parts 定義
2. 找一個你熟悉的 UI 元件（如 Dialog），思考它還需要哪些 parts？
3. 在 [`playground/react/src/App.css`](playground/react/src/App.css) 中找出使用 `data-state` 的 CSS 規則
4. 試著為一個假想的 `Slider` 元件設計 anatomy（它有哪些 parts？）

---

## 延伸閱讀

- [Zag.js Anatomy](https://github.com/zag-js/zag/tree/main/packages/utilities/anatomy)
- [Ark UI 使用 anatomy 的方式](https://github.com/chakra-ui/ark/blob/main/packages/react/src/components/accordion/accordion.anatomy.ts)
- [CSS Attribute Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
- [WAI-ARIA States and Properties](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def)
