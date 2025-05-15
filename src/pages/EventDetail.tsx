import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, ArrowRight, Loader } from 'lucide-react';
import Button from '../components/ui/Button';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { state, fetchEvents, getEventById } = useEvents();
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      if (state.events.length === 0) {
        await fetchEvents();
      }
      setLoading(false);
    };
    
    loadEvent();
  }, [fetchEvents, state.events.length]);

  if (loading || state.status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D243A]"></div>
      </div>
    );
  }

  const event = getEventById(eventId || '');

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/events')}>
          Back to Events
        </Button>
      </div>
    );
  }

  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRegister = () => {
    if (authState.isAuthenticated) {
      navigate(`/events/${event.id}/dances`);
    } else {
      navigate('/login', { state: { from: `/events/${event.id}/dances` } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Image */}
      <div 
        className="h-80 rounded-xl overflow-hidden mb-8 relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${event.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white shadow-text">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Event Details</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <CalendarDays size={24} className="text-[#7D243A] mr-2" />
                <span className="text-lg">
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="flex items-center mb-4 md:mb-0">
                <Clock size={24} className="text-[#7D243A] mr-2" />
                <span className="text-lg">{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={24} className="text-[#7D243A] mr-2" />
                <span className="text-lg">{event.location}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>
            
            <Button
              onClick={handleRegister}
              size="lg"
              className="flex items-center justify-center"
            >
              Register for This Event
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>

          {/* Available Dances */}
          <h2 className="text-2xl font-bold mb-4">Available Dances</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {event.dances.map(dance => (
                <div key={dance.id} className="bg-[#F5F5DC] rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold mb-2">{dance.name}</h3>
                  <p className="text-sm text-gray-700">{dance.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Event Information</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">What to Expect</h3>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="bg-[#7D243A] rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</span>
                <span>Professional dance instructors available</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#7D243A] rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</span>
                <span>Live music and performances</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#7D243A] rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">3</span>
                <span>Elegant venue with professional dance floor</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#7D243A] rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">4</span>
                <span>Refreshments and light snacks available</span>
              </li>
            </ul>
            
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Dress Code</h3>
            <p className="text-gray-700 mb-6">
              Formal attire is required. Men are expected to wear suits or tuxedos, and women are encouraged to wear elegant dresses or gowns.
            </p>
            
            <Button
              onClick={handleRegister}
              fullWidth
            >
              Register Now
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about this event, please contact our event coordinator.
            </p>
            <div className="text-gray-700">
              <p className="mb-1"><strong>Email:</strong> events@danceevents.com</p>
              <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;