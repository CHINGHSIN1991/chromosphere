export interface DropdownState {
  isOpen: boolean;
  selectedIndex: number;
  highlightedIndex: number;
}

export interface DropdownOptions<T = any> {
  items: T[];
  defaultOpen?: boolean;
  defaultSelectedIndex?: number;
  onSelect?: (item: T, index: number) => void;
  onChange?: (isOpen: boolean) => void;
}

export interface DropdownActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  selectItem: (index: number) => void;
  highlightItem: (index: number) => void;
  highlightNext: () => void;
  highlightPrevious: () => void;
  selectHighlighted: () => void;
}

export interface DropdownReturn<T = any> extends DropdownState, DropdownActions {
  items: T[];
  selectedItem: T | null;
  highlightedItem: T | null;
}

