import type { TabsState, TabsOptions, TabsActions } from './types';

export function createTabsState(options: TabsOptions): TabsState {
  return {
    activeIndex: options.defaultIndex ?? 0,
  };
}

export function createTabsActions(
  state: TabsState,
  setState: (updater: (state: TabsState) => TabsState) => void,
  options: TabsOptions,
  tabCount: number
): TabsActions {
  const { onChange } = options;

  return {
    setActiveIndex: (index: number) => {
      if (index < 0 || index >= tabCount) return;

      setState((prev) => {
        if (prev.activeIndex === index) return prev;
        onChange?.(index);
        return { activeIndex: index };
      });
    },

    activateNext: () => {
      setState((prev) => {
        const nextIndex = (prev.activeIndex + 1) % tabCount;
        onChange?.(nextIndex);
        return { activeIndex: nextIndex };
      });
    },

    activatePrevious: () => {
      setState((prev) => {
        const prevIndex = (prev.activeIndex - 1 + tabCount) % tabCount;
        onChange?.(prevIndex);
        return { activeIndex: prevIndex };
      });
    },
  };
}

