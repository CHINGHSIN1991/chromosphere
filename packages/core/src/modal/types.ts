export interface ModalState {
  isOpen: boolean;
}

export interface ModalOptions {
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

export interface ModalActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface ModalReturn extends ModalState, ModalActions {}

