# Ch06：ARIA 無障礙設計

## 關鍵知識點

- WAI-ARIA Accordion Pattern 規格
- `aria-expanded`、`aria-controls`、`aria-labelledby` 的用途
- `role` 屬性的必要性
- `hidden` vs `display: none` vs `visibility: hidden`
- 鍵盤導航的實作
- `data-disabled` vs `disabled` 屬性

---

## 1. 為什麼無障礙很重要？

無頭元件庫（Headless Component Library）的核心價值之一就是**內建正確的無障礙支援**。

許多自訂 UI 元件（如手工打造的 Accordion）容易遺漏無障礙屬性，導致：
- 螢幕閱讀器（Screen Reader）無法正確播報狀態
- 鍵盤使用者無法操作元件
- 不符合 WCAG 2.1 AA 標準（某些地區有法律要求）

---

## 2. WAI-ARIA Accordion Pattern

規格來源：[https://www.w3.org/WAI/ARIA/apg/patterns/accordion/](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

### 必要的 ARIA 屬性

#### Trigger（按鈕）上的屬性

```html
<button
  type="button"
  aria-expanded="true"
  aria-controls="section1-content"
>
  Section 1
</button>
```

- `aria-expanded="true|false"` — 告知螢幕閱讀器面板是否展開
- `aria-controls="[contentId]"` — 指向這個按鈕控制的內容區域的 id

#### Content（內容區域）上的屬性

```html
<div
  id="section1-content"
  role="region"
  aria-labelledby="section1-trigger"
>
  內容...
</div>
```

- `id` — 提供給 Trigger 的 `aria-controls` 使用
- `role="region"` — 宣告這是一個地標區域（landmark region）
- `aria-labelledby="[triggerId]"` — 指向標記這個 region 的元素（即 Trigger）

#### 完整結構

```html
<div>
  <!-- Item 1 -->
  <h3>  <!-- 推薦使用標題元素包住 trigger -->
    <button
      id="trigger-1"
      type="button"
      aria-expanded="true"
      aria-controls="content-1"
    >
      第一個問題
    </button>
  </h3>
  <div
    id="content-1"
    role="region"
    aria-labelledby="trigger-1"
  >
    第一個答案的內容
  </div>

  <!-- Item 2（收合狀態） -->
  <h3>
    <button
      id="trigger-2"
      type="button"
      aria-expanded="false"
      aria-controls="content-2"
    >
      第二個問題
    </button>
  </h3>
  <div
    id="content-2"
    role="region"
    aria-labelledby="trigger-2"
    hidden
  >
    第二個答案的內容
  </div>
</div>
```

---

## 3. ID 的生成策略

`aria-controls` 和 `aria-labelledby` 需要穩定的 DOM ID。在元件庫中，ID 通常有幾種生成策略：

### 策略一：使用者提供 `value` 作為 ID 的一部分

```tsx
// AccordionItem 接受 value="question-1"
// contentId 可以是 `accordion-content-question-1`
```

### 策略二：自動生成唯一 ID

React 18 提供了 `useId()` hook：

```typescript
import { useId } from 'react'

function AccordionItem({ value: itemValue }) {
  const uid = useId()
  const contentId = `${uid}-content`
  const triggerId = `${uid}-trigger`
  // ...
}
```

`useId()` 在 SSR 和 CSR 中生成一致的 ID，避免 hydration mismatch。

---

## 4. `hidden` 屬性 vs CSS 隱藏

### `hidden` 屬性（推薦給收合內容）

```html
<div hidden>內容</div>
```

- 完全從 DOM 的無障礙樹（accessibility tree）中移除
- 等效於 `display: none`
- 螢幕閱讀器不會讀取

### `aria-hidden="true"`

```html
<div aria-hidden="true">裝飾性圖示</div>
```

- 從無障礙樹移除，但 DOM 仍然存在
- 適用於裝飾性元素（icon、空格等）
- **不應該**用在實質內容上

### CSS `visibility: hidden`

```css
.hidden { visibility: hidden; }
```

- 元素不可見，但仍佔據空間
- 螢幕閱讀器**仍然會讀取**
- 不適合用來「隱藏」可收合的內容

---

## 5. 鍵盤導航規格

WAI-ARIA 規格定義了 Accordion 的鍵盤操作：

| 按鍵 | 行為 |
|------|------|
| `Enter` 或 `Space` | 展開/收合當前 item |
| `Tab` | 移動焦點到下一個可互動元素 |
| `Shift + Tab` | 移動焦點到上一個可互動元素 |
| `↓`（向下箭頭） | 焦點移到下一個 Trigger |
| `↑`（向上箭頭） | 焦點移到上一個 Trigger |
| `Home` | 焦點移到第一個 Trigger |
| `End` | 焦點移到最後一個 Trigger |

> 💡 箭頭鍵和 Home/End 是「可選的」（optional），Enter/Space 是必要的（因為 `<button>` 預設支援）。

### 實作鍵盤導航

```tsx
// 在 AccordionRoot 上收集所有 trigger 的 ref
// 在 AccordionItemTrigger 上監聽 keydown

const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
  const triggers = // 取得所有可見的 trigger
  const currentIndex = triggers.indexOf(e.currentTarget)

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      triggers[(currentIndex + 1) % triggers.length]?.focus()
      break
    case 'ArrowUp':
      e.preventDefault()
      triggers[(currentIndex - 1 + triggers.length) % triggers.length]?.focus()
      break
    case 'Home':
      e.preventDefault()
      triggers[0]?.focus()
      break
    case 'End':
      e.preventDefault()
      triggers[triggers.length - 1]?.focus()
      break
  }
}
```

---

## 6. `disabled` vs `data-disabled`

### 原生 `disabled` 屬性

```html
<button disabled>觸發</button>
```

- 阻止所有互動（click、focus、鍵盤）
- 從 Tab 焦點順序移除
- 某些螢幕閱讀器會跳過

### `data-disabled` 自訂屬性

```html
<button data-disabled="">觸發</button>
```

- 允許聚焦（對鍵盤使用者友善）
- 允許螢幕閱讀器播報「已禁用」
- 需要手動阻止 click 事件

### 元件庫的做法

通常同時使用兩種方式：

```tsx
<button
  disabled={isDisabled}           // 原生禁用
  {...(isDisabled && {            // CSS 定位用的 data 屬性
    'data-disabled': ''
  })}
/>
```

---

## 7. `data-state` 的完整清單

不同元件有不同的 `data-state` 值：

| 元件 | 可能的 data-state 值 |
|------|---------------------|
| Accordion / Collapsible | `open` / `closed` |
| Dialog / Popover / Tooltip | `open` / `closed` |
| Checkbox | `checked` / `unchecked` / `indeterminate` |
| Switch | `checked` / `unchecked` |
| Tabs Trigger | `active` / `inactive` |

```css
/* 使用 data-state 來定義樣式 */
[data-part="item-trigger"][aria-expanded="true"] {
  font-weight: bold;
}

[data-part="item-content"][data-state="open"] {
  animation: slideDown 200ms ease-out;
}

[data-part="item-content"][data-state="closed"] {
  animation: slideUp 200ms ease-in;
}
```

---

## 練習

1. 用螢幕閱讀器（macOS VoiceOver：`Cmd + F5`）測試 Accordion，確認播報內容正確
2. 只用鍵盤（不用滑鼠）操作 Accordion，確認 Tab 和 Enter 正常運作
3. 打開瀏覽器 DevTools 的 Accessibility 面板，查看 ARIA 樹狀結構
4. 在 AccordionItemTrigger 中實作箭頭鍵導航

---

## 延伸閱讀

- [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)
- [React useId](https://react.dev/reference/react/useId)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
