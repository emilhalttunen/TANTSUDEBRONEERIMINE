import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import PartnerCard from '../components/partners/PartnerCard';
import Button from '../components/ui/Button';
import { useEvents } from '../context/EventContext';
import { usePartners } from '../context/PartnerContext';
import { Dance, Partner } from '../types';

const PartnerSelection: React.FC = () => {
  const { eventId, danceId } = useParams<{ eventId: string; danceId: string }>();
  const { state: eventState, getEventById } = useEvents();
  const { state: partnerState, fetchPartners } = usePartners();
  const navigate = useNavigate();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDance, setSelectedDance] = useState<Dance | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchPartners();
      setLoading(false);
    };
    
    loadData();
  }, [fetchPartners]);

  useEffect(() => {
    const event = getEventById(eventId || '');
    if (event) {
      const dance = event.dances.find(d => d.id === danceId);
      if (dance) {
        setSelectedDance(dance);
      }
    }
  }, [eventId, danceId, getEventById]);

  if (loading || partnerState.status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D243A]"></div>
      </div>
    );
  }

  const event = getEventById(eventId || '');

  if (!event || !selectedDance) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Event or Dance Not Found</h2>
        <p className="mb-6">We couldn't find the event or dance you selected.</p>
        <Button onClick={() => navigate('/events')}>
          Back to Events
        </Button>
      </div>
    );
  }

  const handlePartnerSelect = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const handleNext = () => {
    // Store selected information in local storage for confirmation page
    const selectionData = {
      event,
      dance: selectedDance,
      partner: selectedPartner
    };
    localStorage.setItem('booking-selection', JSON.stringify(selectionData));
    navigate('/confirmation');
  };

  const handleSkip = () => {
    // Proceed without selecting a partner
    const selectionData = {
      event,
      dance: selectedDance,
      partner: null
    };
    localStorage.setItem('booking-selection', JSON.stringify(selectionData));
    navigate('/confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-gray-900">
          Select Your Partner
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
          Choose a dance partner for {selectedDance.name} at {event.title}
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
              2
            </div>
            <span className="text-sm mt-1 font-medium">Partner</span>
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

      {/* Selected Dance Summary */}
      <div className="bg-[#F5F5DC] p-6 rounded-lg mb-8 max-w-xl mx-auto">
        <h3 className="text-xl font-bold mb-2">You selected:</h3>
        <div className="flex items-center">
          <div className="w-20 h-20 overflow-hidden rounded-lg mr-4">
            <img 
              src={selectedDance.imageUrl} 
              alt={selectedDance.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold">{selectedDance.name}</h4>
            <p className="text-gray-700">{selectedDance.description}</p>
          </div>
        </div>
      </div>

      {/* Partner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {partnerState.partners.map(partner => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onSelect={handlePartnerSelect}
            selected={selectedPartner?.id === partner.id}
          />
        ))}
      </div>

      {/* Skip Partner Selection */}
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">Don't need a partner or bringing your own?</p>
        <Button variant="outline" onClick={handleSkip}>
          Skip Partner Selection
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-md mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate(`/events/${event.id}/dances`)}
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

export default PartnerSelection;