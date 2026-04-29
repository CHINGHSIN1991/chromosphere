import { useState } from 'react'
import { Collapsible } from '@chromosphere/react/collapsible'
import './App.css'

function App() {
  const [controlledOpen, setControlledOpen] = useState(false)

  return (
    <div className="playground">
      <header className="playground-header">
        <h1>🌌 Chromosphere Playground</h1>
        <p>React component testing environment</p>
      </header>

      <main className="playground-main">
        {/* ============================================ */}
        {/* Demo 1: Basic (Uncontrolled) Collapsible     */}
        {/* ============================================ */}
        <section className="demo-section">
          <h2>Demo 1 — Basic (Uncontrolled)</h2>
          <p className="demo-description">
            最基本的用法，元件自己管理 open 狀態（非受控模式）
          </p>

          <div className="demo-box">
            <Collapsible.Root>
              <Collapsible.Trigger>Toggle Content</Collapsible.Trigger>
              <Collapsible.Content>
                <div className="content-inner">
                  <p>👋 This is the collapsible content!</p>
                  <p>It should appear when the trigger is clicked.</p>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </section>

        {/* ============================================ */}
        {/* Demo 2: Default Open                         */}
        {/* ============================================ */}
        <section className="demo-section">
          <h2>Demo 2 — Default Open</h2>
          <p className="demo-description">
            使用 <code>defaultOpen</code> 預設展開
          </p>

          <div className="demo-box">
            <Collapsible.Root defaultOpen>
              <Collapsible.Trigger>Toggle Content</Collapsible.Trigger>
              <Collapsible.Content>
                <div className="content-inner">
                  <p>🎉 I'm open by default!</p>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </section>

        {/* ============================================ */}
        {/* Demo 3: Controlled                           */}
        {/* ============================================ */}
        <section className="demo-section">
          <h2>Demo 3 — Controlled</h2>
          <p className="demo-description">
            受控模式：外部管理 open 狀態，搭配 <code>onOpenChange</code> 回調
          </p>

          <div className="demo-controls">
            <label>
              External state:
              <strong>{controlledOpen ? ' Open' : ' Closed'}</strong>
            </label>
            <button onClick={() => setControlledOpen((o) => !o)}>
              External Toggle
            </button>
          </div>

          <div className="demo-box">
            <Collapsible.Root
              open={controlledOpen}
              onOpenChange={setControlledOpen}
            >
              <Collapsible.Trigger>
                Trigger (also toggles)
              </Collapsible.Trigger>
              <Collapsible.Content>
                <div className="content-inner">
                  <p>🔗 Controlled by external state</p>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </section>

        {/* ============================================ */}
        {/* Demo 4: Disabled                             */}
        {/* ============================================ */}
        <section className="demo-section">
          <h2>Demo 4 — Disabled</h2>
          <p className="demo-description">
            使用 <code>disabled</code> 禁用互動
          </p>

          <div className="demo-box">
            <Collapsible.Root disabled>
              <Collapsible.Trigger>
                Can't toggle me (disabled)
              </Collapsible.Trigger>
              <Collapsible.Content>
                <div className="content-inner">
                  <p>You shouldn't see this.</p>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </section>

        {/* ============================================ */}
        {/* Demo 5: Custom Styling with data-state       */}
        {/* ============================================ */}
        <section className="demo-section">
          <h2>Demo 5 — Custom Styling</h2>
          <p className="demo-description">
            使用 <code>[data-state]</code> CSS selector 自訂樣式
          </p>

          <div className="demo-box styled-demo">
            <Collapsible.Root>
              <Collapsible.Trigger className="styled-trigger">
                ▶ 展開更多資訊
              </Collapsible.Trigger>
              <Collapsible.Content className="styled-content">
                <div className="content-inner">
                  <p>🎨 Styled with CSS <code>[data-state]</code> selectors</p>
                  <ul>
                    <li>Trigger rotates arrow icon on open</li>
                    <li>Content has slide-down animation</li>
                    <li>Smooth transitions</li>
                  </ul>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
