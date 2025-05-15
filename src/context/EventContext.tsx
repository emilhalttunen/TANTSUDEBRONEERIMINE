import React, { createContext, useContext, useReducer } from 'react';
import { EventsState, Event } from '../types';
import { mockEvents } from '../data/mockData';

type EventAction = 
  | { type: 'FETCH_EVENTS_REQUEST' }
  | { type: 'FETCH_EVENTS_SUCCESS'; payload: Event[] }
  | { type: 'FETCH_EVENTS_FAILURE'; payload: string }
  | { type: 'SELECT_EVENT'; payload: Event }
  | { type: 'CLEAR_SELECTED_EVENT' };

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
  status: 'idle',
  error: null
};

const EventContext = createContext<{
  state: EventsState;
  fetchEvents: () => Promise<void>;
  selectEvent: (event: Event) => void;
  clearSelectedEvent: () => void;
  getEventById: (id: string) => Event | undefined;
}>({
  state: initialState,
  fetchEvents: async () => {},
  selectEvent: () => {},
  clearSelectedEvent: () => {},
  getEventById: () => undefined
});

const eventReducer = (state: EventsState, action: EventAction): EventsState => {
  switch (action.type) {
    case 'FETCH_EVENTS_REQUEST':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_EVENTS_SUCCESS':
      return { 
        ...state, 
        status: 'succeeded', 
        events: action.payload,
        error: null 
      };
    case 'FETCH_EVENTS_FAILURE':
      return { 
        ...state, 
        status: 'failed', 
        error: action.payload 
      };
    case 'SELECT_EVENT':
      return { ...state, selectedEvent: action.payload };
    case 'CLEAR_SELECTED_EVENT':
      return { ...state, selectedEvent: null };
    default:
      return state;
  }
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Mock fetch events function
  const fetchEvents = async () => {
    dispatch({ type: 'FETCH_EVENTS_REQUEST' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: mockEvents });
    } catch (error) {
      dispatch({ type: 'FETCH_EVENTS_FAILURE', payload: 'Failed to fetch events' });
    }
  };

  const selectEvent = (event: Event) => {
    dispatch({ type: 'SELECT_EVENT', payload: event });
  };

  const clearSelectedEvent = () => {
    dispatch({ type: 'CLEAR_SELECTED_EVENT' });
  };

  const getEventById = (id: string) => {
    return state.events.find(event => event.id === id);
  };

  return (
    <EventContext.Provider value={{ 
      state, 
      fetchEvents, 
      selectEvent, 
      clearSelectedEvent, 
      getEventById 
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);