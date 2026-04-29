import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './switch'

// =============================================================================
// TODO: 實作 Switch 測試
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
//   - 和 Checkbox 非常相似，但 HiddenInput 用 role="switch" 而非預設的 checkbox role
//   - Switch 只有 on/off 兩種狀態（不像 Checkbox 有 indeterminate）
//   - Control + Thumb 是視覺層，用 CSS transform 做滑動動畫
//
// 📖 參考：
// - Testing Library: https://testing-library.com/docs/react-testing-library/intro/
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
// =============================================================================

describe('Switch', () => {
  it('TODO: renders without crashing', () => {
    // TODO: render 基本的 Switch
    // render(
    //   <Switch.Root>
    //     ...
    //   </Switch.Root>
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
