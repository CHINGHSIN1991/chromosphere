import type { ModalState, ModalOptions, ModalActions } from './types';

export function createModalState(options: ModalOptions): ModalState {
  return {
    isOpen: options.defaultOpen ?? false,
  };
}

export function createModalActions(
  state: ModalState,
  setState: (updater: (state: ModalState) => ModalState) => void,
  options: ModalOptions
): ModalActions {
  const { onOpenChange } = options;

  return {
    open: () => {
      setState((prev) => {
        if (prev.isOpen) return prev;
        onOpenChange?.(true);
        return { isOpen: true };
      });
    },

    close: () => {
      setState((prev) => {
        if (!prev.isOpen) return prev;
        onOpenChange?.(false);
        return { isOpen: false };
      });
    },

    toggle: () => {
      setState((prev) => {
        const newIsOpen = !prev.isOpen;
        onOpenChange?.(newIsOpen);
        return { isOpen: newIsOpen };
      });
    },
  };
}

