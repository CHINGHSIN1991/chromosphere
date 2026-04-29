import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from './dialog'

// =============================================================================
// TODO: 實作 Dialog 測試
// =============================================================================
//
// 建議測試案例：
//
// ✅ 渲染測試
//   - 確認元件能正確渲染不報錯
//   - 確認 DOM 結構包含預期的元素
//
// ✅ 互動測試
//   - 點擊/觸發後狀態應改變
//   - disabled 狀態下不應該觸發
//
// ✅ ARIA 無障礙測試
//   - 確認 ARIA 屬性正確（aria-expanded、aria-controls 等）
//   - 確認鍵盤導航可運作
//
// ✅ 受控 vs 非受控模式
//   - 非受控：state 由元件內部管理
//   - 受控：state 由外部 value prop 控制
//
// 💡 鍵提醒：
//   - Content 需要 role="dialog"、aria-modal="true"
//   - Content 的 aria-labelledby 指向 Title 的 id，aria-describedby 指向 Description 的 id
//   - Focus trap：Dialog 開啟時焦點應限制在 Content 內（重要的無障礙需求）
//
// 📖 參考：
// - Testing Library: https://testing-library.com/docs/react-testing-library/intro/
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
// =============================================================================

describe('Dialog', () => {
  it('TODO: renders without crashing', () => {
    // TODO: render 基本的 Dialog
    // render(
    //   <Dialog.Root>
    //     ...
    //   </Dialog.Root>
    // )
    // expect(screen.getByRole('...')).toBeInTheDocument()
  })

  it('TODO: handles user interaction', async () => {
    // TODO: 測試點擊等互動
    // const user = userEvent.setup()
    // render(...)
    // await user.click(screen.getByRole('...'))
    // expect(...).toBeInTheDocument()
  })

  it('TODO: has correct ARIA attributes', () => {
    // TODO: 測試 ARIA 屬性
  })
})
