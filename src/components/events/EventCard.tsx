import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Event } from '../../types';

type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
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

  return (
    <Card hoverable className="h-full flex flex-col transition-all duration-300 border border-transparent hover:border-[#7D243A]">
      <div className="h-48 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 font-serif mb-2">{event.title}</h3>
        
        <div className="text-gray-600 mb-4 space-y-2">
          <div className="flex items-center">
            <CalendarDays size={18} className="mr-2 text-[#7D243A]" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-[#7D243A]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-[#7D243A]" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 flex-grow">
          {event.description.length > 120 
            ? `${event.description.substring(0, 120)}...` 
            : event.description}
        </p>
        
        <div className="mt-auto">
          <Button onClick={handleViewDetails} fullWidth>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;