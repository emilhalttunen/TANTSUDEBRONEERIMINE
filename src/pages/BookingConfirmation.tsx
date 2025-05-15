import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Check, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useBookings } from '../context/BookingContext';
import { Dance, Event, Partner } from '../types';

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { createBooking, state: bookingState } = useBookings();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [dance, setDance] = useState<Dance | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Retrieve selection data from localStorage
    const selectionData = localStorage.getItem('booking-selection');
    
    if (selectionData) {
      const { event, dance, partner } = JSON.parse(selectionData);
      setEvent(event);
      setDance(dance);
      setPartner(partner);
    } else {
      // No selection data, redirect to events page
      navigate('/events');
    }
  }, [navigate]);

  const handleConfirm = async () => {
    if (event && dance) {
      setProcessing(true);
      
      const booking = await createBooking(event, dance, partner || undefined);
      
      if (booking) {
        setConfirmed(true);
        // Clear selection data
        localStorage.removeItem('booking-selection');
      }
      
      setProcessing(false);
    }
  };

  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!event || !dance) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D243A]"></div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="mx-auto bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
              <Check size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold mb-2 text-gray-900">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600">
              Your reservation for {event.title} has been successfully confirmed.
            </p>
          </div>
          
          <div className="bg-[#F5F5DC] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Booking Details</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Event:</h4>
                <p>{event.title}</p>
              </div>
              
              <div className="flex items-center">
                <CalendarDays size={20} className="text-[#7D243A] mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="text-[#7D243A] mr-2" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={20} className="text-[#7D243A] mr-2" />
                <span>{event.location}</span>
              </div>
              
              <div>
                <h4 className="font-bold">Dance:</h4>
                <p>{dance.name}</p>
              </div>
              
              {partner && (
                <div>
                  <h4 className="font-bold">Partner:</h4>
                  <p>{partner.name}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8 text-gray-700">
            <h3 className="text-xl font-bold mb-4">What's Next?</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>You'll receive a confirmation email with all the details.</li>
              <li>Arrive at least 15 minutes before the event starts.</li>
              <li>Remember to follow the dress code: formal attire is required.</li>
              <li>Enjoy your dance experience!</li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate('/profile')}
              size="lg"
            >
              View My Bookings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/events')}
              size="lg"
            >
              Browse More Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-gray-900">
          Confirm Your Booking
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
          Please review and confirm your dance registration
        </p>
        <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="bg-[#7D243A] text-white w-8 h-8 rounded-full flex items-center justify-center">
              ✓
            </div>
            <span className="text-sm mt-1 font-medium">Dance</span>
          </div>
          <div className="flex-1 h-1 bg-[#7D243A] mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-[#7D243A] text-white w-8 h-8 rounded-full flex items-center justify-center">
              ✓
            </div>
            <span className="text-sm mt-1 font-medium">Partner</span>
          </div>
          <div className="flex-1 h-1 bg-[#7D243A] mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-[#7D243A] text-white w-8 h-8 rounded-full flex items-center justify-center">
              3
            </div>
            <span className="text-sm mt-1 font-medium">Confirm</span>
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Booking Summary</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              
              <div className="space-y-2 text-gray-700 mb-4">
                <div className="flex items-center">
                  <CalendarDays size={18} className="text-[#7D243A] mr-2" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-[#7D243A] mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="text-[#7D243A] mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F5F5DC] p-4 rounded-lg">
              <h4 className="font-bold mb-2">Selected Dance</h4>
              <div className="flex items-center">
                <div className="w-16 h-16 overflow-hidden rounded-lg mr-3">
                  <img 
                    src={dance.imageUrl} 
                    alt={dance.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold">{dance.name}</h5>
                  <p className="text-sm text-gray-700">{dance.description.substring(0, 60)}...</p>
                </div>
              </div>
            </div>
            
            {partner ? (
              <div className="bg-[#F5F5DC] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Selected Partner</h4>
                <div className="flex items-center">
                  <div className="w-16 h-16 overflow-hidden rounded-lg mr-3">
                    <img 
                      src={partner.imageUrl} 
                      alt={partner.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold">{partner.name}</h5>
                    <p className="text-sm text-gray-700 capitalize">
                      Experience: {partner.experience}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#F5F5DC] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Partner</h4>
                <p className="text-gray-700">No partner selected. You'll participate without a pre-assigned partner.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold mb-4">Terms and Conditions</h3>
        <div className="text-gray-700 text-sm mb-4">
          <p className="mb-2">By confirming this booking, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Arrive on time for the event</li>
            <li>Follow the dress code requirements</li>
            <li>Comply with venue and event rules</li>
            <li>Cancellations must be made at least 48 hours before the event</li>
          </ul>
        </div>
      </div>

      {/* Error Message */}
      {bookingState.error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{bookingState.error}</span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-md mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={processing}
          className="flex items-center"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Confirm Booking
              <Check size={20} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;