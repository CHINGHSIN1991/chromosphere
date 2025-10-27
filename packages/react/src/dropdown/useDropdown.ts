import { useState, useCallback, useEffect, useRef } from 'react';
import {
  createDropdownState,
  createDropdownActions,
  getSelectedItem,
  getHighlightedItem,
  type DropdownOptions,
  type DropdownReturn,
} from '@headless-ui-lib/core';

export function useDropdown<T = any>(
  options: DropdownOptions<T>
): DropdownReturn<T> {
  const [state, setState] = useState(() => createDropdownState(options));
  const actionsRef = useRef(createDropdownActions(state, setState, options));

  // Update actions ref when options change
  useEffect(() => {
    actionsRef.current = createDropdownActions(state, setState, options);
  }, [options, state]);

  const actions = actionsRef.current;

  // Memoize derived values
  const selectedItem = getSelectedItem(state, options.items);
  const highlightedItem = getHighlightedItem(state, options.items);

  // Keyboard event handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!state.isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          actions.highlightNext();
          break;
        case 'ArrowUp':
          event.preventDefault();
          actions.highlightPrevious();
          break;
        case 'Enter':
          event.preventDefault();
          actions.selectHighlighted();
          break;
        case 'Escape':
          event.preventDefault();
          actions.close();
          break;
      }
    },
    [state.isOpen, actions]
  );

  // Add keyboard event listener
  useEffect(() => {
    if (state.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [state.isOpen, handleKeyDown]);

  return {
    ...state,
    ...actions,
    items: options.items,
    selectedItem,
    highlightedItem,
  };
}

