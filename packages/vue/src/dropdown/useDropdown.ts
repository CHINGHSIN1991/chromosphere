import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';
import {
  createDropdownState,
  createDropdownActions,
  getSelectedItem,
  getHighlightedItem,
  type DropdownOptions,
  type DropdownState,
} from '@headless-ui-lib/core';

export function useDropdown<T = any>(options: DropdownOptions<T>) {
  const state = ref<DropdownState>(createDropdownState(options)) as Ref<DropdownState>;

  const setState = (updater: (state: DropdownState) => DropdownState) => {
    state.value = updater(state.value);
  };

  const actions = createDropdownActions(state.value, setState, options);

  // Derived values
  const selectedItem = computed(() => getSelectedItem(state.value, options.items));
  const highlightedItem = computed(() => getHighlightedItem(state.value, options.items));

  // Keyboard event handler
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!state.value.isOpen) return;

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
  };

  // Add keyboard event listener
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  return {
    isOpen: computed(() => state.value.isOpen),
    selectedIndex: computed(() => state.value.selectedIndex),
    highlightedIndex: computed(() => state.value.highlightedIndex),
    items: options.items,
    selectedItem,
    highlightedItem,
    ...actions,
  };
}

