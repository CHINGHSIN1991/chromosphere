export interface TabsState {
  activeIndex: number;
}

export interface TabsOptions {
  defaultIndex?: number;
  onChange?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

export interface TabsActions {
  setActiveIndex: (index: number) => void;
  activateNext: () => void;
  activatePrevious: () => void;
}

export interface TabsReturn extends TabsState, TabsActions {
  tabCount: number;
}

