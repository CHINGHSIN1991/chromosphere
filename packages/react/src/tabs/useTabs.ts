import { useState, useCallback, useEffect, useRef } from 'react';
import {
  createTabsState,
  createTabsActions,
  type TabsOptions,
  type TabsReturn,
} from '@headless-ui-lib/core';

export function useTabs(
  tabCount: number,
  options: TabsOptions = {}
): TabsReturn {
  const [state, setState] = useState(() => createTabsState(options));
  const actionsRef = useRef(
    createTabsActions(state, setState, options, tabCount)
  );

  // Update actions ref when options or tabCount change
  useEffect(() => {
    actionsRef.current = createTabsActions(state, setState, options, tabCount);
  }, [options, state, tabCount]);

  const actions = actionsRef.current;

  // Keyboard event handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [options.orientation, actions]
  );

  return {
    ...state,
    ...actions,
    tabCount,
    handleKeyDown: (event: React.KeyboardEvent) => {
      handleKeyDown(event.nativeEvent);
    },
  } as TabsReturn & {
    handleKeyDown: (event: React.KeyboardEvent) => void;
  };
}

