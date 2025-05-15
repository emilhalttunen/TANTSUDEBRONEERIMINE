import React, { createContext, useContext, useReducer } from 'react';
import { PartnersState, Partner } from '../types';
import { mockPartners } from '../data/mockData';

type PartnerAction = 
  | { type: 'FETCH_PARTNERS_REQUEST' }
  | { type: 'FETCH_PARTNERS_SUCCESS'; payload: Partner[] }
  | { type: 'FETCH_PARTNERS_FAILURE'; payload: string }
  | { type: 'SELECT_PARTNER'; payload: Partner }
  | { type: 'CLEAR_SELECTED_PARTNER' };

const initialState: PartnersState = {
  partners: [],
  selectedPartner: null,
  status: 'idle',
  error: null
};

const PartnerContext = createContext<{
  state: PartnersState;
  fetchPartners: () => Promise<void>;
  selectPartner: (partner: Partner) => void;
  clearSelectedPartner: () => void;
  getPartnerById: (id: string) => Partner | undefined;
}>({
  state: initialState,
  fetchPartners: async () => {},
  selectPartner: () => {},
  clearSelectedPartner: () => {},
  getPartnerById: () => undefined
});

const partnerReducer = (state: PartnersState, action: PartnerAction): PartnersState => {
  switch (action.type) {
    case 'FETCH_PARTNERS_REQUEST':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_PARTNERS_SUCCESS':
      return { 
        ...state, 
        status: 'succeeded', 
        partners: action.payload,
        error: null 
      };
    case 'FETCH_PARTNERS_FAILURE':
      return { 
        ...state, 
        status: 'failed', 
        error: action.payload 
      };
    case 'SELECT_PARTNER':
      return { ...state, selectedPartner: action.payload };
    case 'CLEAR_SELECTED_PARTNER':
      return { ...state, selectedPartner: null };
    default:
      return state;
  }
};

export const PartnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(partnerReducer, initialState);

  // Mock fetch partners function
  const fetchPartners = async () => {
    dispatch({ type: 'FETCH_PARTNERS_REQUEST' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      dispatch({ type: 'FETCH_PARTNERS_SUCCESS', payload: mockPartners });
    } catch (error) {
      dispatch({ type: 'FETCH_PARTNERS_FAILURE', payload: 'Failed to fetch partners' });
    }
  };

  const selectPartner = (partner: Partner) => {
    dispatch({ type: 'SELECT_PARTNER', payload: partner });
  };

  const clearSelectedPartner = () => {
    dispatch({ type: 'CLEAR_SELECTED_PARTNER' });
  };

  const getPartnerById = (id: string) => {
    return state.partners.find(partner => partner.id === id);
  };

  return (
    <PartnerContext.Provider value={{ 
      state, 
      fetchPartners, 
      selectPartner, 
      clearSelectedPartner, 
      getPartnerById 
    }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartners = () => useContext(PartnerContext);