import { useState, useEffect, useCallback, useRef } from 'react';
import {
  createModalState,
  createModalActions,
  type ModalOptions,
  type ModalReturn,
} from '@headless-ui-lib/core';

export function useModal(options: ModalOptions = {}): ModalReturn {
  const [state, setState] = useState(() => createModalState(options));
  const actionsRef = useRef(createModalActions(state, setState, options));
  const modalRef = useRef<HTMLElement | null>(null);

  // Update actions ref when options change
  useEffect(() => {
    actionsRef.current = createModalActions(state, setState, options);
  }, [options, state]);

  const actions = actionsRef.current;

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        state.isOpen &&
        event.key === 'Escape' &&
        (options.closeOnEscape ?? true)
      ) {
        event.preventDefault();
        actions.close();
      }
    },
    [state.isOpen, options.closeOnEscape, actions]
  );

  // Handle outside click
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        state.isOpen &&
        (options.closeOnOutsideClick ?? true) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        actions.close();
      }
    },
    [state.isOpen, options.closeOnOutsideClick, actions]
  );

  // Add event listeners
  useEffect(() => {
    if (state.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [state.isOpen, handleKeyDown, handleOutsideClick]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (state.isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [state.isOpen]);

  return {
    ...state,
    ...actions,
    modalRef: (element: HTMLElement | null) => {
      modalRef.current = element;
    },
  } as ModalReturn & { modalRef: (element: HTMLElement | null) => void };
}

