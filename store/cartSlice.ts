
import api from '../api';
import { setCookie,getCookie } from "cookies-next";


interface cartState {
    cart: {};
    isCartOpen: boolean;
}
// interface SetCartAction {
//     type: 'SET_CART_ITEM';
//     payload: {};
// }

// type cartAction = SetCartAction;



const initialState: cartState = {
    cart: {},
    isCartOpen: false,
};

const cartSlice = {
    name: 'cart',
    reducer: (state = initialState, action: any): cartState => {
        switch (action.type) {
            case 'SET_CART_ITEM':
                return {
                    ...state,
                    cart: { ...action.payload },
                };
            case 'GET_CART_ITEM':
                return {
                    ...state,
                    cart: { ...action.payload },
                };
            case 'TOGGLE_CART':
                return {
                    ...state,
                    isCartOpen: state.isCartOpen ? false : true,
                };
            default:
                return state;
        }
    },
    actions: {
        setCartItem: (payload: any): any => ({
            type: 'SET_CART_ITEM',
            payload,
        }),
        getCartItem: (payload: any): any => ({
            type: 'GET_CART_ITEM',
            payload,
        }),
        toggleCart: (): any => ({
            type: 'TOGGLE_CART',
        }),
    },
    selectors: {
        getCart: (state: cartState) => state.cart,
        getIsCartOpen : (state: cartState) => state.isCartOpen,
    },

};



export const getCartItems = () => async (dispatch: any) => {
    try {
        let sui = getCookie('sui') || undefined
        if (!sui) {
          const newsui = crypto.randomUUID()
          setCookie('sui', newsui)
           sui = newsui
        }
        const response = await api.request('/cart');
        dispatch(cartSlice.actions.getCartItem(response.data));
    } catch (err: any) {
        throw new Error(err);
    }
};

export const addCartItems = (data: any) => async (dispatch: any) => {
    console.log(data, 'data@@@@@@@@@@@@@@@@@add')
    try {
        // console.log(data);
        let sui = getCookie('sui') || undefined
        if (!sui) {
          const newsui = crypto.randomUUID()
          setCookie('sui', newsui)
        }
        const body:any = { productId: data._id }
        const response = await api.request('/cart/addToCart', undefined, { body: JSON.stringify(body), method: 'PUT' });
       
        if (response && response.code == 200) {
            response.data.lastChangedItem = {...data}
            response.data.lastChangedItem.lastChange = 'add'
            // console.log(response);
            dispatch(cartSlice.actions.setCartItem(response?.data));
        }

        return response

    } catch (err: any) {
        throw new Error(err);
    }
};



export default cartSlice;