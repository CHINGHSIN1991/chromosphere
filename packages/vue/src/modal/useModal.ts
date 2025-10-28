import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue';
import {
  createModalState,
  createModalActions,
  type ModalOptions,
  type ModalState,
} from '@headless-ui-lib/core';

export function useModal(options: ModalOptions = {}) {
  const state = ref<ModalState>(createModalState(options)) as Ref<ModalState>;
  const modalRef = ref<HTMLElement | null>(null);

  const setState = (updater: (state: ModalState) => ModalState) => {
    state.value = updater(state.value);
  };

  const actions = createModalActions(state.value, setState, options);

  // Handle escape key
  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      state.value.isOpen &&
      event.key === 'Escape' &&
      (options.closeOnEscape ?? true)
    ) {
      event.preventDefault();
      actions.close();
    }
  };

  // Handle outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      state.value.isOpen &&
      (options.closeOnOutsideClick ?? true) &&
      modalRef.value &&
      !modalRef.value.contains(event.target as Node)
    ) {
      actions.close();
    }
  };

  // Add event listeners
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousedown', handleOutsideClick);
  });

  // Lock body scroll when modal is open
  watch(
    () => state.value.isOpen,
    (isOpen) => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  );

  return {
    isOpen: state,
    modalRef,
    ...actions,
  };
}

