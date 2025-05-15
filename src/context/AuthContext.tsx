import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '../types';
import { mockUsers } from '../data/mockData';

type AuthAction = 
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null
};

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  state: initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return { ...state, status: 'loading', error: null };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return { 
        ...state, 
        status: 'succeeded', 
        isAuthenticated: true, 
        user: action.payload, 
        error: null 
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return { 
        ...state, 
        status: 'failed', 
        isAuthenticated: false, 
        user: null, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Remove password from user object before storing
        const { password: _, ...secureUser } = user;
        localStorage.setItem('user', JSON.stringify(secureUser));
        dispatch({ type: 'LOGIN_SUCCESS', payload: secureUser });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'An error occurred during login' });
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        dispatch({ type: 'REGISTER_FAILURE', payload: 'Email already in use' });
      } else {
        const newUser: User = {
          id: (mockUsers.length + 1).toString(),
          name,
          email
        };
        
        // In a real app, we would send this to an API
        // mockUsers.push({ ...newUser, password });
        
        localStorage.setItem('user', JSON.stringify(newUser));
        dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
      }
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: 'An error occurred during registration' });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);