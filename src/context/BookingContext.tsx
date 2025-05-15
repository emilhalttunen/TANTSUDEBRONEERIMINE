import React, { createContext, useContext, useReducer } from 'react';
import { BookingsState, Booking, Dance, Partner, Event } from '../types';
import { mockBookings } from '../data/mockData';
import { useAuth } from './AuthContext';

type BookingAction = 
  | { type: 'FETCH_BOOKINGS_REQUEST' }
  | { type: 'FETCH_BOOKINGS_SUCCESS'; payload: Booking[] }
  | { type: 'FETCH_BOOKINGS_FAILURE'; payload: string }
  | { type: 'CREATE_BOOKING_REQUEST' }
  | { type: 'CREATE_BOOKING_SUCCESS'; payload: Booking }
  | { type: 'CREATE_BOOKING_FAILURE'; payload: string }
  | { type: 'CANCEL_BOOKING_REQUEST' }
  | { type: 'CANCEL_BOOKING_SUCCESS'; payload: string }
  | { type: 'CANCEL_BOOKING_FAILURE'; payload: string }
  | { type: 'SELECT_BOOKING'; payload: Booking }
  | { type: 'CLEAR_SELECTED_BOOKING' };

const initialState: BookingsState = {
  bookings: [],
  selectedBooking: null,
  status: 'idle',
  error: null
};

type BookingContextType = {
  state: BookingsState;
  fetchUserBookings: () => Promise<void>;
  createBooking: (event: Event, dance: Dance, partner?: Partner) => Promise<Booking | null>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  selectBooking: (booking: Booking) => void;
  clearSelectedBooking: () => void;
};

const BookingContext = createContext<BookingContextType>({
  state: initialState,
  fetchUserBookings: async () => {},
  createBooking: async () => null,
  cancelBooking: async () => false,
  selectBooking: () => {},
  clearSelectedBooking: () => {}
});

const bookingReducer = (state: BookingsState, action: BookingAction): BookingsState => {
  switch (action.type) {
    case 'FETCH_BOOKINGS_REQUEST':
    case 'CREATE_BOOKING_REQUEST':
    case 'CANCEL_BOOKING_REQUEST':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_BOOKINGS_SUCCESS':
      return { 
        ...state, 
        status: 'succeeded', 
        bookings: action.payload, 
        error: null 
      };
    case 'CREATE_BOOKING_SUCCESS':
      return { 
        ...state, 
        status: 'succeeded', 
        bookings: [...state.bookings, action.payload], 
        selectedBooking: action.payload,
        error: null 
      };
    case 'CANCEL_BOOKING_SUCCESS':
      return { 
        ...state, 
        status: 'succeeded', 
        bookings: state.bookings.filter(booking => booking.id !== action.payload),
        selectedBooking: null,
        error: null 
      };
    case 'FETCH_BOOKINGS_FAILURE':
    case 'CREATE_BOOKING_FAILURE':
    case 'CANCEL_BOOKING_FAILURE':
      return { 
        ...state, 
        status: 'failed', 
        error: action.payload 
      };
    case 'SELECT_BOOKING':
      return { ...state, selectedBooking: action.payload };
    case 'CLEAR_SELECTED_BOOKING':
      return { ...state, selectedBooking: null };
    default:
      return state;
  }
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const { state: authState } = useAuth();

  // Mock fetch bookings function
  const fetchUserBookings = async () => {
    dispatch({ type: 'FETCH_BOOKINGS_REQUEST' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!authState.user) {
        throw new Error('User not authenticated');
      }
      
      const userBookings = mockBookings.filter(booking => booking.userId === authState.user?.id);
      dispatch({ type: 'FETCH_BOOKINGS_SUCCESS', payload: userBookings });
    } catch (error) {
      dispatch({ type: 'FETCH_BOOKINGS_FAILURE', payload: 'Failed to fetch bookings' });
    }
  };

  // Mock create booking function
  const createBooking = async (event: Event, dance: Dance, partner?: Partner): Promise<Booking | null> => {
    dispatch({ type: 'CREATE_BOOKING_REQUEST' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!authState.user) {
        throw new Error('User not authenticated');
      }
      
      const newBooking: Booking = {
        id: `${Date.now()}`,
        userId: authState.user.id,
        eventId: event.id,
        danceId: dance.id,
        partnerId: partner?.id,
        confirmed: true
      };
      
      // In a real app, this would be an API call
      mockBookings.push(newBooking);
      
      dispatch({ type: 'CREATE_BOOKING_SUCCESS', payload: newBooking });
      return newBooking;
    } catch (error) {
      dispatch({ type: 'CREATE_BOOKING_FAILURE', payload: 'Failed to create booking' });
      return null;
    }
  };

  // Mock cancel booking function
  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    dispatch({ type: 'CANCEL_BOOKING_REQUEST' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call
      const index = mockBookings.findIndex(b => b.id === bookingId);
      if (index !== -1) {
        mockBookings.splice(index, 1);
      }
      
      dispatch({ type: 'CANCEL_BOOKING_SUCCESS', payload: bookingId });
      return true;
    } catch (error) {
      dispatch({ type: 'CANCEL_BOOKING_FAILURE', payload: 'Failed to cancel booking' });
      return false;
    }
  };

  const selectBooking = (booking: Booking) => {
    dispatch({ type: 'SELECT_BOOKING', payload: booking });
  };

  const clearSelectedBooking = () => {
    dispatch({ type: 'CLEAR_SELECTED_BOOKING' });
  };

  return (
    <BookingContext.Provider value={{ 
      state, 
      fetchUserBookings, 
      createBooking, 
      cancelBooking, 
      selectBooking, 
      clearSelectedBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);