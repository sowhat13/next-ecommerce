
interface userState {
  user: {};
}
interface SetUserAction {
  type: 'SET_USER';
  payload: {};
}

type userAction = SetUserAction;



const initialState: userState = {
  user: {},
};

const userSlice = {
  name: 'user',
  reducer: (state = initialState, action: userAction): userState => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: {...action.payload},
        };
      default:
        return state;
    }
  },
  actions: {
    setUser: (payload: any): SetUserAction => ({
      type: 'SET_USER',
      payload,
    }),
  },
  selectors: {
    getUser: (state: userState) => state.user,
  },

};







export default userSlice;