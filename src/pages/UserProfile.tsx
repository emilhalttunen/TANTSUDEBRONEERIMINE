import React, { useEffect, useState } from 'react';
import { User, UserCircle, Calendar, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import BookingItem from '../components/bookings/BookingItem';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { useEvents } from '../context/EventContext';
import { usePartners } from '../context/PartnerContext';
import { useNavigate } from 'react-router-dom';
import { Booking, Dance, Event, Partner } from '../types';

const UserProfile: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state: bookingState, fetchUserBookings, cancelBooking } = useBookings();
  const { state: eventState, fetchEvents } = useEvents();
  const { state: partnerState, fetchPartners } = usePartners();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchEvents(),
        fetchPartners(),
        fetchUserBookings()
      ]);
      setLoading(false);
    };
    
    loadData();
  }, [fetchEvents, fetchPartners, fetchUserBookings]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId);
    }
  };

  // Get event, dance, and partner details for each booking
  const getBookingDetails = (booking: Booking) => {
    const event = eventState.events.find(e => e.id === booking.eventId);
    let dance: Dance | undefined;
    
    if (event) {
      dance = event.dances.find(d => d.id === booking.danceId);
    }
    
    const partner = booking.partnerId 
      ? partnerState.partners.find(p => p.id === booking.partnerId) 
      : undefined;
    
    return { event, dance, partner };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D243A]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-[#7D243A] h-32 relative"></div>
        <div className="px-4 sm:px-6 -mt-16 relative">
          <div className="bg-white rounded-full w-32 h-32 mx-auto border-4 border-white shadow-lg flex items-center justify-center">
            <UserCircle size={100} className="text-gray-400" />
          </div>
          
          <div className="text-center py-6">
            <h1 className="text-2xl font-bold">{authState.user?.name}</h1>
            <p className="text-gray-600">{authState.user?.email}</p>
          </div>
          
          <div className="flex justify-center pb-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center ${
              activeTab === 'bookings'
                ? 'border-b-2 border-[#7D243A] text-[#7D243A]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={18} className="mr-2" />
            My Bookings
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center ${
              activeTab === 'account'
                ? 'border-b-2 border-[#7D243A] text-[#7D243A]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('account')}
          >
            <User size={18} className="mr-2" />
            Account Settings
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Your Dance Bookings</h2>
              
              {bookingState.status === 'loading' ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7D243A]"></div>
                </div>
              ) : bookingState.bookings.length > 0 ? (
                <div>
                  {bookingState.bookings.map(booking => {
                    const { event, dance, partner } = getBookingDetails(booking);
                    
                    if (!event || !dance) return null;
                    
                    return (
                      <BookingItem
                        key={booking.id}
                        booking={booking}
                        event={event}
                        dance={dance}
                        partner={partner}
                        onCancel={handleCancelBooking}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                    <Calendar size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Bookings Yet</h3>
                  <p className="text-gray-600 mb-4">
                    You haven't registered for any dance events yet.
                  </p>
                  <Button onClick={() => navigate('/events')}>
                    Browse Events
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-2">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{authState.user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{authState.user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">Account Actions</h3>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <p className="text-gray-500 text-sm">
                  This is a demo application. In a real application, you would be able to change your password, update your profile information, and manage your account preferences.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;