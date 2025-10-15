import React, { createContext, useContext, useReducer, useEffect } from 'react';
import ApiService from '../services/api';

const AppContext = createContext();

const initialState = {
  products: [
    {
      id: 1,
      name: "Vestido Midi Floral",
      price: 89.99,
      stock: 15,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop&auto=format"
    },
    {
      id: 2,
      name: "Camisa Oxford Blanca",
      price: 45.99,
      stock: 8,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop&auto=format"
    },
    {
      id: 3,
      name: "Jeans Skinny Azul",
      price: 79.99,
      stock: 12,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop&auto=format"
    },
    {
      id: 4,
      name: "Blazer Negro Clásico",
      price: 129.99,
      stock: 5,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop&auto=format"
    },
    {
      id: 5,
      name: "Falda Plisada Midi",
      price: 55.99,
      stock: 20,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=300&h=400&fit=crop&auto=format"
    },
    {
      id: 6,
      name: "Suéter Cuello Alto",
      price: 65.99,
      stock: 0,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop&auto=format"
    }
  ],
  cart: [],
  user: null,
  isAuthenticated: false,
  loading: false,
  salesTotal: 0
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: []
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'UPDATE_SALES_TOTAL':
      return {
        ...state,
        salesTotal: action.payload
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const loadProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const products = await ApiService.getProducts();
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await ApiService.createProduct(productData);
      dispatch({ type: 'ADD_PRODUCT', payload: response.product });
      return response.product;
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await ApiService.updateProduct(id, productData);
      dispatch({ type: 'UPDATE_PRODUCT', payload: response.product });
      return response.product;
    } catch (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await ApiService.deleteProduct(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
  };

  const refreshDashboard = async () => {
    try {
      const response = await ApiService.getSalesTotal();
      dispatch({ type: 'UPDATE_SALES_TOTAL', payload: response.totalSales });
    } catch (error) {
      console.error('Error actualizando total de ventas:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
  
  return (
    <AppContext.Provider value={{ 
      state, 
      dispatch, 
      loadProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      refreshDashboard
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
}