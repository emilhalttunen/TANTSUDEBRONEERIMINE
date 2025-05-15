import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import DanceCard from '../components/dances/DanceCard';
import Button from '../components/ui/Button';
import { useEvents } from '../context/EventContext';
import { Dance } from '../types';

const DanceSelection: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { state, fetchEvents, getEventById } = useEvents();
  const navigate = useNavigate();
  const [selectedDance, setSelectedDance] = useState<Dance | null>(null);
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

  const handleDanceSelect = (dance: Dance) => {
    setSelectedDance(dance);
  };

  const handleNext = () => {
    if (selectedDance) {
      navigate(`/events/${event.id}/dances/${selectedDance.id}/partners`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-gray-900">
          Select Your Dance
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
          Choose the dance style you'd like to participate in at {event.title}
        </p>
        <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="bg-[#7D243A] text-white w-8 h-8 rounded-full flex items-center justify-center">
              1
            </div>
            <span className="text-sm mt-1 font-medium">Dance</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-2">
            <div className="h-full w-0 bg-[#7D243A]"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center">
              2
            </div>
            <span className="text-sm mt-1">Partner</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-2">
            <div className="h-full w-0 bg-[#7D243A]"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center">
              3
            </div>
            <span className="text-sm mt-1">Confirm</span>
          </div>
        </div>
      </div>

      {/* Dance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {event.dances.map(dance => (
          <DanceCard
            key={dance.id}
            dance={dance}
            onSelect={handleDanceSelect}
            selected={selectedDance?.id === dance.id}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-md mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate(`/events/${event.id}`)}
          className="flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedDance}
          className="flex items-center"
        >
          Next
          <ArrowRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DanceSelection;