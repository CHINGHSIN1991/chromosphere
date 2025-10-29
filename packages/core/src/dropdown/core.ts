import type { DropdownState, DropdownOptions, DropdownActions } from './types';

export function createDropdownState<T = any>(
  options: DropdownOptions<T>
): DropdownState {
  return {
    isOpen: options.defaultOpen ?? false,
    selectedIndex: options.defaultSelectedIndex ?? -1,
    highlightedIndex: -1,
  };
}

export function createDropdownActions<T = any>(
  state: DropdownState,
  setState: (updater: (state: DropdownState) => DropdownState) => void,
  options: DropdownOptions<T>
): DropdownActions {
  const { items, onSelect, onChange } = options;

  return {
    open: () => {
      setState((prev) => {
        if (prev.isOpen) return prev;
        onChange?.(true);
        const hasItems = items.length > 0;
        const initialHighlight =
          prev.selectedIndex >= 0 && prev.selectedIndex < items.length
            ? prev.selectedIndex
            : hasItems
            ? 0
            : -1;
        return {
          ...prev,
          isOpen: true,
          highlightedIndex: initialHighlight,
        };
      });
    },

    close: () => {
      setState((prev) => {
        if (!prev.isOpen) return prev;
        onChange?.(false);
        return { ...prev, isOpen: false, highlightedIndex: -1 };
      });
    },

    toggle: () => {
      setState((prev) => {
        const newIsOpen = !prev.isOpen;
        onChange?.(newIsOpen);
        const hasItems = items.length > 0;
        const initialHighlight =
          prev.selectedIndex >= 0 && prev.selectedIndex < items.length
            ? prev.selectedIndex
            : hasItems
            ? 0
            : -1;
        return {
          ...prev,
          isOpen: newIsOpen,
          highlightedIndex: newIsOpen ? initialHighlight : -1,
        };
      });
    },

    selectItem: (index: number) => {
      if (index < 0 || index >= items.length) return;

      setState((prev) => {
        onSelect?.(items[index], index);
        onChange?.(false);
        return {
          ...prev,
          selectedIndex: index,
          isOpen: false,
          highlightedIndex: -1,
        };
      });
    },

    highlightItem: (index: number) => {
      if (index < -1 || index >= items.length) return;

      setState((prev) => ({
        ...prev,
        highlightedIndex: index,
      }));
    },

    highlightNext: () => {
      if (items.length === 0) return;

      setState((prev) => {
        const currentIndex =
          prev.highlightedIndex >= 0 && prev.highlightedIndex < items.length
            ? prev.highlightedIndex
            : -1;
        const nextIndex =
          currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        return { ...prev, highlightedIndex: nextIndex };
      });
    },

    highlightPrevious: () => {
      if (items.length === 0) return;

      setState((prev) => {
        const currentIndex =
          prev.highlightedIndex >= 0 && prev.highlightedIndex < items.length
            ? prev.highlightedIndex
            : items.length;
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        return { ...prev, highlightedIndex: prevIndex };
      });
    },

    selectHighlighted: () => {
      setState((prev) => {
        if (prev.highlightedIndex === -1) return prev;

        const index = prev.highlightedIndex;
        onSelect?.(items[index], index);
        onChange?.(false);
        return {
          ...prev,
          selectedIndex: index,
          isOpen: false,
          highlightedIndex: -1,
        };
      });
    },
  };
}

export function getSelectedItem<T>(state: DropdownState, items: T[]): T | null {
  return state.selectedIndex >= 0 && state.selectedIndex < items.length
    ? items[state.selectedIndex]
    : null;
}

export function getHighlightedItem<T>(state: DropdownState, items: T[]): T | null {
  return state.highlightedIndex >= 0 && state.highlightedIndex < items.length
    ? items[state.highlightedIndex]
    : null;
}

