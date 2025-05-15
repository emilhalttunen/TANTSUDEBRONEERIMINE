export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only used for registration/login, not stored in state
}

export interface Dance {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Partner {
  id: string;
  name: string;
  imageUrl: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  available: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dances: Dance[];
  imageUrl: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  danceId: string;
  partnerId?: string; // Optional, as user might not select a partner
  confirmed: boolean;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type EventsState = {
  events: Event[];
  selectedEvent: Event | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type BookingsState = {
  bookings: Booking[];
  selectedBooking: Booking | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type PartnersState = {
  partners: Partner[];
  selectedPartner: Partner | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};