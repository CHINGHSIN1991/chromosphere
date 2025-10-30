import {
  ref,
  computed,
  watch,
  nextTick,
  type Ref,
  type ComputedRef,
} from 'vue';
import {
  createDropdownState,
  createDropdownActions,
  getSelectedItem,
  getHighlightedItem,
  type DropdownOptions,
  type DropdownState,
  type DropdownReturn,
} from '@headless-ui-lib/core';

type VueRef<T> =
  | Ref<T | null>
  | ((value: T | null) => void)
  | { value: T | null }
  | null
  | undefined;

function callAllHandlers<TEvent>(
  ...handlers: Array<((event: TEvent) => void) | undefined>
) {
  return (event: TEvent) => {
    handlers.forEach((handler) => handler?.(event));
  };
}

function assignRef<T>(ref: VueRef<T>, value: T | null) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
  } else if ('value' in ref) {
    (ref as Ref<T | null>).value = value;
  }
}

let dropdownId = 0;

function getNextId() {
  dropdownId += 1;
  return `dropdown-${dropdownId}`;
}

export interface VueDropdownReturn<T = any>
  extends Omit<
    DropdownReturn<T>,
    'isOpen' | 'selectedIndex' | 'highlightedIndex' | 'selectedItem' | 'highlightedItem'
  > {
  isOpen: ComputedRef<boolean>;
  selectedIndex: ComputedRef<number>;
  highlightedIndex: ComputedRef<number>;
  selectedItem: ComputedRef<T | null>;
  highlightedItem: ComputedRef<T | null>;
  open: () => void;
  close: () => void;
  toggle: () => void;
  selectItem: (index: number) => void;
  highlightItem: (index: number) => void;
  highlightNext: () => void;
  highlightPrevious: () => void;
  selectHighlighted: () => void;
  getTriggerProps: (
    userProps?: Record<string, any> & { ref?: VueRef<HTMLElement> }
  ) => Record<string, any>;
  getMenuProps: (
    userProps?: Record<string, any> & { ref?: VueRef<HTMLElement> }
  ) => Record<string, any>;
  getItemProps: (
    index: number,
    userProps?: Record<string, any> & { ref?: VueRef<HTMLElement> }
  ) => Record<string, any>;
}

export function useDropdown<T = any>(
  options: DropdownOptions<T>
): VueDropdownReturn<T> {
  const state = ref<DropdownState>(createDropdownState(options)) as Ref<DropdownState>;

  const setState = (updater: (state: DropdownState) => DropdownState) => {
    state.value = updater(state.value);
  };

  const actions = createDropdownActions(state.value, setState, options);
  const triggerRef = ref<HTMLElement | null>(null);
  const menuRef = ref<HTMLElement | null>(null);
  const id = getNextId();

  // Derived values
  const selectedItem = computed(() => getSelectedItem(state.value, options.items));
  const highlightedItem = computed(() => getHighlightedItem(state.value, options.items));

  const closeAndFocusTrigger = () => {
    actions.close();
    nextTick(() => {
      triggerRef.value?.focus();
    });
  };

  const selectItem = (index: number) => {
    actions.selectItem(index);
    nextTick(() => {
      triggerRef.value?.focus();
    });
  };

  const selectHighlighted = () => {
    actions.selectHighlighted();
    nextTick(() => {
      triggerRef.value?.focus();
    });
  };

  const toggle = () => {
    const wasOpen = state.value.isOpen;
    actions.toggle();
    nextTick(() => {
      if (wasOpen) {
        triggerRef.value?.focus();
      } else if (state.value.isOpen) {
        menuRef.value?.focus();
      }
    });
  };

  const open = () => {
    actions.open();
    nextTick(() => {
      menuRef.value?.focus();
    });
  };

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        actions.highlightNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        actions.highlightPrevious();
        break;
      case 'Home':
        event.preventDefault();
        actions.highlightItem(0);
        break;
      case 'End':
        event.preventDefault();
        actions.highlightItem(options.items.length - 1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (state.value.highlightedIndex >= 0) {
          selectItem(state.value.highlightedIndex);
        }
        break;
      }
      case 'Escape':
        event.preventDefault();
        closeAndFocusTrigger();
        break;
      case 'Tab':
        closeAndFocusTrigger();
        break;
    }
  };

  watch(
    () => state.value.isOpen,
    (isOpen) => {
      if (isOpen) {
        nextTick(() => {
          menuRef.value?.focus();
        });
      }
    }
  );

  const menuId = `${id}-menu`;
  const triggerId = `${id}-trigger`;
  const getItemId = (index: number) => `${id}-item-${index}`;

  const getTriggerProps = (
    userProps: Record<string, any> & { ref?: VueRef<HTMLElement> } = {}
  ) => ({
    id: triggerId,
    role: userProps.role ?? 'button',
    'aria-haspopup': 'listbox',
    'aria-expanded': state.value.isOpen,
    'aria-controls': menuId,
    tabindex: userProps.tabindex ?? 0,
    ...userProps,
    ref: (el: HTMLElement | null) => {
      triggerRef.value = el;
      assignRef(userProps.ref, el);
    },
    onClick: callAllHandlers(userProps.onClick, () => {
      toggle();
    }),
    onKeydown: callAllHandlers(userProps.onKeydown, handleTriggerKeyDown),
  });

  const getMenuProps = (
    userProps: Record<string, any> & { ref?: VueRef<HTMLElement> } = {}
  ) => ({
    id: menuId,
    role: userProps.role ?? 'listbox',
    tabindex: userProps.tabindex ?? -1,
    'aria-labelledby': triggerId,
    'aria-activedescendant':
      state.value.highlightedIndex >= 0
        ? getItemId(state.value.highlightedIndex)
        : undefined,
    ...userProps,
    ref: (el: HTMLElement | null) => {
      menuRef.value = el;
      assignRef(userProps.ref, el);
    },
    onKeydown: callAllHandlers(userProps.onKeydown, handleMenuKeyDown),
    onBlur: callAllHandlers(userProps.onBlur, (event: FocusEvent) => {
      const relatedTarget = event.relatedTarget as Node | null;
      if (!relatedTarget || !(event.currentTarget as HTMLElement).contains(relatedTarget)) {
        closeAndFocusTrigger();
      }
    }),
  });

  const getItemProps = (
    index: number,
    userProps: Record<string, any> & { ref?: VueRef<HTMLElement> } = {}
  ) => ({
    id: getItemId(index),
    role: userProps.role ?? 'option',
    tabindex: userProps.tabindex ?? -1,
    'aria-selected': state.value.selectedIndex === index,
    ...userProps,
    ref: (el: HTMLElement | null) => {
      assignRef(userProps.ref, el);
    },
    onClick: callAllHandlers(userProps.onClick, () => selectItem(index)),
    onMouseenter: callAllHandlers(userProps.onMouseenter, () =>
      actions.highlightItem(index)
    ),
  });

  return {
    isOpen: computed(() => state.value.isOpen),
    selectedIndex: computed(() => state.value.selectedIndex),
    highlightedIndex: computed(() => state.value.highlightedIndex),
    items: options.items,
    selectedItem,
    highlightedItem,
    open,
    close: closeAndFocusTrigger,
    toggle,
    selectItem,
    highlightItem: actions.highlightItem,
    highlightNext: actions.highlightNext,
    highlightPrevious: actions.highlightPrevious,
    selectHighlighted,
    getTriggerProps,
    getMenuProps,
    getItemProps,
  };
}

