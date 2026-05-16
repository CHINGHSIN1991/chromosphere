# Ch13：動畫整合

## 關鍵知識點

- CSS `transition` 搭配 `data-state` 屬性
- 展開/收合動畫的實作難點（高度動畫）
- CSS `@keyframes` 動畫
- Framer Motion 的整合方式
- `AnimatePresence` 處理離場動畫
- Radix UI 的動畫設計模式

---

## 1. 最簡單的做法：CSS transition + data-state

透過 `data-state` 屬性，可以用純 CSS 實作基本動畫：

```css
/* 收合狀態（初始） */
[data-part="item-content"] {
  overflow: hidden;
  transition: opacity 200ms ease;
  opacity: 0;
}

/* 展開狀態 */
[data-part="item-content"][data-state="open"] {
  opacity: 1;
}
```

這在 [`playground/react/src/App.css`](playground/react/src/App.css) 中就有使用。

---

## 2. 高度動畫的難題

`height: 0` → `height: auto` 的動畫無法直接用 CSS transition：

```css
/* ❌ 這不會有動畫效果 */
[data-part="item-content"] {
  height: 0;
  transition: height 200ms ease;  /* height: auto 不能 transition！ */
}
[data-part="item-content"][data-state="open"] {
  height: auto;
}
```

### 解決方案一：CSS Grid 技巧

```css
[data-part="item-content"] {
  display: grid;
  grid-template-rows: 0fr;  /* 收合：0 高度 */
  transition: grid-template-rows 200ms ease;
}

[data-part="item-content"][data-state="open"] {
  grid-template-rows: 1fr;  /* 展開：自動高度 */
}

/* 需要一個內部包裝元素 */
[data-part="item-content"] > * {
  overflow: hidden;
}
```

### 解決方案二：CSS @keyframes（Radix UI 做法）

```css
@keyframes slideDown {
  from { height: 0; }
  to { height: var(--radix-collapsible-content-height); }
}

@keyframes slideUp {
  from { height: var(--radix-collapsible-content-height); }
  to { height: 0; }
}

[data-part="item-content"][data-state="open"] {
  animation: slideDown 200ms ease-out;
}

[data-part="item-content"][data-state="closed"] {
  animation: slideUp 200ms ease-in;
}
```

這需要元件在渲染時注入 CSS 變數：

```tsx
// AccordionItemContent 實作中
const [height, setHeight] = useState(0)
const contentRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (contentRef.current) {
    setHeight(contentRef.current.scrollHeight)
  }
}, [isExpanded])

return (
  <div
    style={{
      '--accordion-content-height': `${height}px`,
    } as CSSProperties}
    data-state={isExpanded ? 'open' : 'closed'}
  >
    {children}
  </div>
)
```

---

## 3. Framer Motion 整合

[Framer Motion](https://www.framer.com/motion/) 讓動畫更容易，特別是展開/收合：

### 安裝

```bash
pnpm add framer-motion
```

### 基本整合

```tsx
import { motion, AnimatePresence } from 'framer-motion'

// 替換 AccordionItemContent 的渲染
const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>(
  ({ children, ...props }, ref) => {
    const { isExpanded } = useAccordionItemContext()

    return (
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
```

### `AnimatePresence` 的作用

當元件從 DOM 移除時，`AnimatePresence` 讓它先執行 `exit` 動畫再真正消失：

```tsx
// 沒有 AnimatePresence：元件立即消失，看不到收合動畫
{isExpanded && <div>內容</div>}

// 有 AnimatePresence：
// 1. isExpanded 變 false
// 2. 執行 exit 動畫（height: 0, opacity: 0）
// 3. 動畫完成後，元件才從 DOM 移除
<AnimatePresence>
  {isExpanded && <motion.div exit={{ height: 0 }}>內容</motion.div>}
</AnimatePresence>
```

---

## 4. 「無頭」元件如何支援動畫？

元件庫本身不應該強制使用特定的動畫庫。常見的做法：

### 方法一：使用者自己實作（純 data-state）

元件只提供 `data-state` 屬性，動畫完全由使用者的 CSS 控制：

```css
/* 使用者的 CSS */
[data-part="item-content"] {
  /* 任何動畫實作都可以 */
}
```

### 方法二：提供可替換的動畫元件（asChild 模式）

```tsx
// 使用者用 asChild 把 content 換成 motion.div
<Accordion.ItemContent asChild>
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: 'auto' }}
  >
    內容
  </motion.div>
</Accordion.ItemContent>
```

### 方法三：提供 Transition API（Radix UI 做法）

Radix UI 的一些元件有 `forceMount` prop，讓內容永遠在 DOM 中，讓外部動畫庫可以控制顯示/隱藏：

```tsx
// 元件用 hidden 隱藏，但仍在 DOM
<Accordion.ItemContent forceMount hidden={!isExpanded}>
  <AnimatePresence>
    {isExpanded && <motion.div exit={{ opacity: 0 }}>內容</motion.div>}
  </AnimatePresence>
</Accordion.ItemContent>
```

---

## 5. Playground 的動畫示範

[`playground/react/src/App.css`](playground/react/src/App.css) 中有簡單的動畫示例：

```css
.styled-demo [data-part="item-content"] {
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.styled-demo [data-part="item-content"][data-state="open"] {
  /* 展開狀態的樣式 */
}
```

---

## 練習

1. 在 playground 中，用 `grid-template-rows` 技巧實作平滑的高度動畫
2. 安裝 `framer-motion`，用 `AnimatePresence` 替換 Accordion 的展開動畫
3. 實作 `forceMount` prop，讓元件在收合時仍留在 DOM（方便動畫庫控制）
4. 比較純 CSS 動畫和 Framer Motion 的開發體驗差異

---

## 延伸閱讀

- [CSS Grid 高度動畫技巧](https://css-tricks.com/almanac/properties/g/grid-template-rows/#aa-animation)
- [Framer Motion](https://www.framer.com/motion/)
- [AnimatePresence](https://www.framer.com/motion/animate-presence/)
- [Radix UI 動畫指南](https://www.radix-ui.com/primitives/docs/guides/animation)
- [Ark UI 動畫整合](https://ark-ui.com/react/docs/guides/animation)
