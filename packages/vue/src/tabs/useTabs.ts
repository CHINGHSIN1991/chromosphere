import { ref, computed, type Ref } from 'vue';
import {
  createTabsState,
  createTabsActions,
  type TabsOptions,
  type TabsState,
} from '@headless-ui-lib/core';

export function useTabs(tabCount: number, options: TabsOptions = {}) {
  const state = ref<TabsState>(createTabsState(options)) as Ref<TabsState>;

  const setState = (updater: (state: TabsState) => TabsState) => {
    state.value = updater(state.value);
  };

  const actions = createTabsActions(state.value, setState, options, tabCount);

  // Keyboard event handler
  const handleKeyDown = (event: KeyboardEvent) => {
    const orientation = options.orientation ?? 'horizontal';

    if (orientation === 'horizontal') {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        actions.activateNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        actions.activatePrevious();
      }
    } else {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        actions.activateNext();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        actions.activatePrevious();
      }
    }
  };

  return {
    activeIndex: computed(() => state.value.activeIndex),
    tabCount,
    ...actions,
    handleKeyDown,
  };
}

