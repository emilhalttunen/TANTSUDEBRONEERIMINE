import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import DanceSelection from './pages/DanceSelection';
import PartnerSelection from './pages/PartnerSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events" element={<EventList />} />
            <Route path="events/:eventId" element={<EventDetail />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="events/:eventId/dances" element={<DanceSelection />} />
              <Route path="events/:eventId/dances/:danceId/partners" element={<PartnerSelection />} />
              <Route path="confirmation" element={<BookingConfirmation />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
            
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;