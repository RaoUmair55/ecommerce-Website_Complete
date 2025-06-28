import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [], // {id, _id, title, price, img, quantity}
};

const getId = item => item._id || item.id;

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(item => getId(item) === getId(action.item));
      if (exists) {
        return {
          ...state,
          items: state.items.map(item =>
            getId(item) === getId(action.item)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(item => getId(item) !== action.id),
      };
    case 'UPDATE':
      return {
        ...state,
        items: state.items.map(item =>
          getId(item) === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = item => dispatch({ type: 'ADD', item });
  const removeFromCart = id => dispatch({ type: 'REMOVE', id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 