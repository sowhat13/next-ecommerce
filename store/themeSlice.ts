
interface ThemeState {
  theme: 'light' | 'dark' | '';
}
interface SetThemeAction {
  type: 'SET_THEME';
  theme: 'light' | 'dark' | '';
}

type ThemeAction = SetThemeAction;



const initialState: ThemeState = {
  theme: 'light',
};

const themeSlice = {
  name: 'theme',
  reducer: (state = initialState, action: ThemeAction): ThemeState => {
    switch (action.type) {
      case 'SET_THEME':
        return {
          ...state,
          theme: action.theme,
        };
      default:
        return state;
    }
  },
  actions: {
    setTheme: (theme: 'light' | 'dark'): SetThemeAction => ({
      type: 'SET_THEME',
      theme,
    }),
  },
  selectors: {
    getTheme: (state: ThemeState) => state.theme,
  },
  
};







export default themeSlice;