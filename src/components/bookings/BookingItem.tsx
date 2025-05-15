import React from 'react';
import { CalendarDays, X } from 'lucide-react';
import Button from '../ui/Button';
import { Booking, Event, Dance, Partner } from '../../types';

type BookingItemProps = {
  booking: Booking;
  event: Event;
  dance: Dance;
  partner?: Partner;
  onCancel: (bookingId: string) => void;
};

const BookingItem: React.FC<BookingItemProps> = ({ 
  booking, 
  event, 
  dance, 
  partner, 
  onCancel 
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-1/4 h-40 md:h-auto">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Booking Details */}
        <div className="p-4 md:w-2/4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <div className="text-gray-600 mb-2 flex items-center">
              <CalendarDays size={18} className="mr-2 text-[#7D243A]" />
              <span>{formatDate(event.date)} at {event.time}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center mb-1">
              <span className="font-medium mr-2">Dance:</span>
              <span>{dance.name}</span>
            </div>
            {partner && (
              <div className="flex items-center">
                <span className="font-medium mr-2">Partner:</span>
                <span>{partner.name}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 md:w-1/4 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-200">
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Confirmed
            </span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => onCancel(booking.id)}
            className="flex items-center justify-center text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            <X size={18} className="mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;