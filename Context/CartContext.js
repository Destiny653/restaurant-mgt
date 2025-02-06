 'use client'
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Local Storage Keys
const CART_STORAGE_KEY = 'restaurant_cart';

// Load cart state from localStorage
const loadCartState = () => {
  if (typeof window === 'undefined') return { items: [], total: 0 };
  
  try {
    const savedState = localStorage.getItem(CART_STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : { items: [], total: 0 };
  } catch (error) {
    console.error('Error loading cart state:', error);
    return { items: [], total: 0 };
  }
};

// Save cart state to localStorage
const saveCartState = (state) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart state:', error);
  }
};

// Cart reducer to handle all cart operations
const cartReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
      break;
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.id === action.payload);
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (item ? item.price * item.quantity : 0),
      };
      break;
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      
      const quantityDiff = action.payload.quantity - item.quantity;
      
      if (action.payload.quantity === 0) {
        newState = {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          total: state.total - (item.price * item.quantity),
        };
      } else {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
          total: state.total + (item.price * quantityDiff),
        };
      }
      break;
    }

    case 'CLEAR_CART': {
      newState = {
        items: [],
        total: 0,
      };
      break;
    }

    case 'LOAD_CART': {
      newState = action.payload;
      break;
    }

    default:
      return state;
  }

  // Save the new state to localStorage after each action
  saveCartState(newState);
  return newState;
};

// Cart Provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Load cart state from localStorage on initial mount
  useEffect(() => {
    const savedState = loadCartState();
    if (savedState.items.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedState });
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for using cart
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Cart utility functions for common operations
export const cartUtils = {
  addItem: (dispatch, item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  },
  
  removeItem: (dispatch, itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  },
  
  updateQuantity: (dispatch, itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  },
  
  clearCart: (dispatch) => {
    dispatch({ type: 'CLEAR_CART' });
  }
};