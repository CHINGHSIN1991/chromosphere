import type React from 'react';
import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useId,
  useMemo,
} from 'react';
import {
  createDropdownState,
  createDropdownActions,
  getSelectedItem,
  getHighlightedItem,
  type DropdownOptions,
  type DropdownReturn,
} from '@headless-ui-lib/core';

type EventHandler<TEvent> = (event: TEvent) => void;

function callAllHandlers<TEvent>(
  ...handlers: Array<EventHandler<TEvent> | undefined>
) {
  return (event: TEvent) => {
    handlers.forEach((handler) => {
      handler?.(event);
    });
  };
}

function assignRef<TElement>(
  ref: React.Ref<TElement> | undefined,
  value: TElement | null
) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    (ref as React.MutableRefObject<TElement | null>).current = value;
  }
}

export interface ReactDropdownReturn<T = any> extends DropdownReturn<T> {
  getTriggerProps: <TElement extends HTMLElement>(
    userProps?: React.HTMLAttributes<TElement> & {
      ref?: React.Ref<TElement>;
    }
  ) => React.HTMLAttributes<TElement> & {
    ref: React.RefCallback<TElement>;
  };
  getMenuProps: <TElement extends HTMLElement>(
    userProps?: React.HTMLAttributes<TElement> & {
      ref?: React.Ref<TElement>;
    }
  ) => React.HTMLAttributes<TElement> & {
    ref: React.RefCallback<TElement>;
  };
  getItemProps: <TElement extends HTMLElement>(
    index: number,
    userProps?: React.LiHTMLAttributes<TElement> & {
      ref?: React.Ref<TElement>;
    }
  ) => React.LiHTMLAttributes<TElement> & {
    ref: React.RefCallback<TElement>;
  };
}

export function useDropdown<T = any>(
  options: DropdownOptions<T>
): ReactDropdownReturn<T> {
  const [state, setState] = useState(() => createDropdownState(options));
  const actionsRef = useRef(createDropdownActions(state, setState, options));
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const id = useId();

  // Update actions ref when options change
  useEffect(() => {
    actionsRef.current = createDropdownActions(state, setState, options);
  }, [options, state]);

  const actions = actionsRef.current;

  const selectedItem = getSelectedItem(state, options.items);
  const highlightedItem = getHighlightedItem(state, options.items);

  const menuId = useMemo(() => `${id}-menu`, [id]);
  const triggerId = useMemo(() => `${id}-trigger`, [id]);
  const getItemId = useCallback((index: number) => `${id}-item-${index}`, [id]);

  const closeAndFocusTrigger = useCallback(() => {
    actions.close();
    triggerRef.current?.focus();
  }, [actions]);

  const selectItem = useCallback(
    (index: number) => {
      actions.selectItem(index);
      triggerRef.current?.focus();
    },
    [actions]
  );

  const toggle = useCallback(() => {
    actions.toggle();
  }, [actions]);

  const open = useCallback(() => {
    actions.open();
  }, [actions]);

  const selectHighlighted = useCallback(() => {
    actions.selectHighlighted();
    triggerRef.current?.focus();
  }, [actions]);

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        open();
        requestAnimationFrame(() => {
          menuRef.current?.focus();
        });
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
        if (!state.isOpen) {
          requestAnimationFrame(() => {
            menuRef.current?.focus();
          });
        }
      }
    },
    [open, toggle, state.isOpen]
  );

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
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
          if (state.highlightedIndex >= 0) {
            selectItem(state.highlightedIndex);
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
    },
    [actions, options.items.length, state.highlightedIndex, selectItem, closeAndFocusTrigger]
  );

  useEffect(() => {
    if (state.isOpen) {
      menuRef.current?.focus();
    }
  }, [state.isOpen]);

  const getTriggerProps = useCallback(
    <TElement extends HTMLElement>(
      userProps: React.HTMLAttributes<TElement> & { ref?: React.Ref<TElement> } = {}
    ) => ({
      id: triggerId,
      role: userProps.role ?? 'button',
      'aria-haspopup': 'listbox' as const,
      'aria-expanded': state.isOpen,
      'aria-controls': menuId,
      tabIndex: userProps.tabIndex ?? 0,
      ...userProps,
      onClick: callAllHandlers<React.MouseEvent<TElement>>(
        userProps.onClick as EventHandler<React.MouseEvent<TElement>>,
        () => {
          toggle();
          if (!state.isOpen) {
            requestAnimationFrame(() => menuRef.current?.focus());
          }
        }
      ),
      onKeyDown: callAllHandlers<React.KeyboardEvent<TElement>>(
        userProps.onKeyDown as EventHandler<React.KeyboardEvent<TElement>>,
        handleTriggerKeyDown
      ),
      ref: (node: TElement | null) => {
        triggerRef.current = node;
        assignRef(userProps.ref, node);
      },
    }),
    [menuId, state.isOpen, toggle, handleTriggerKeyDown, triggerId]
  );

  const getMenuProps = useCallback(
    <TElement extends HTMLElement>(
      userProps: React.HTMLAttributes<TElement> & { ref?: React.Ref<TElement> } = {}
    ) => ({
      id: menuId,
      role: userProps.role ?? 'listbox',
      tabIndex: userProps.tabIndex ?? -1,
      'aria-labelledby': triggerId,
      'aria-activedescendant':
        state.highlightedIndex >= 0
          ? getItemId(state.highlightedIndex)
          : undefined,
      ...userProps,
      onKeyDown: callAllHandlers<React.KeyboardEvent<TElement>>(
        userProps.onKeyDown as EventHandler<React.KeyboardEvent<TElement>>,
        handleMenuKeyDown
      ),
      onBlur: callAllHandlers<React.FocusEvent<TElement>>(
        userProps.onBlur as EventHandler<React.FocusEvent<TElement>>,
        (event: React.FocusEvent<TElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            closeAndFocusTrigger();
          }
        }
      ),
      ref: (node: TElement | null) => {
        menuRef.current = node;
        assignRef(userProps.ref, node);
      },
    }),
    [closeAndFocusTrigger, getItemId, handleMenuKeyDown, menuId, state.highlightedIndex, triggerId]
  );

  const getItemProps = useCallback(
    <TElement extends HTMLElement>(
      index: number,
      userProps: React.LiHTMLAttributes<TElement> & { ref?: React.Ref<TElement> } = {}
    ) => ({
      id: getItemId(index),
      role: userProps.role ?? 'option',
      tabIndex: userProps.tabIndex ?? -1,
      'aria-selected': state.selectedIndex === index,
      ...userProps,
      onClick: callAllHandlers<React.MouseEvent<TElement>>(
        userProps.onClick as EventHandler<React.MouseEvent<TElement>>,
        () => selectItem(index)
      ),
      onMouseEnter: callAllHandlers<React.MouseEvent<TElement>>(
        userProps.onMouseEnter as EventHandler<React.MouseEvent<TElement>>,
        () => actions.highlightItem(index)
      ),
      ref: (node: TElement | null) => {
        assignRef(userProps.ref, node);
      },
    }),
    [actions, getItemId, selectItem, state.selectedIndex]
  );

  return {
    ...state,
    open,
    close: closeAndFocusTrigger,
    toggle,
    selectItem,
    highlightItem: actions.highlightItem,
    highlightNext: actions.highlightNext,
    highlightPrevious: actions.highlightPrevious,
    selectHighlighted,
    items: options.items,
    selectedItem,
    highlightedItem,
    getTriggerProps,
    getMenuProps,
    getItemProps,
  };
}

