
import api from '../api';


interface cartState {
    cart: {};
}
// interface SetCartAction {
//     type: 'SET_CART_ITEM';
//     payload: {};
// }

// type cartAction = SetCartAction;



const initialState: cartState = {
    cart: {},
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
    },
    selectors: {
        getCart: (state: cartState) => state.cart,
    },

};



export const getCartItems = () => async (dispatch: any) => {
    try {
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
        const response = await api.request('/cart/addToCart', undefined, { body: JSON.stringify({ productId: data._id }), method: 'PUT' });
       
        if (response && response.code == 200) {
            response.data.lastChangedItem = data
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