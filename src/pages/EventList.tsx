import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import Button from '../components/ui/Button';
import { useEvents } from '../context/EventContext';

const EventList: React.FC = () => {
  const { state, fetchEvents } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Filter events based on search term
  const filteredEvents = state.events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
          Upcoming Dance Events
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our collection of elegant dance events and find the perfect occasion to showcase your dancing skills.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#7D243A] focus:border-[#7D243A]"
          />
        </div>
      </div>

      {/* Events Grid */}
      {state.status === 'loading' ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D243A]"></div>
        </div>
      ) : state.error ? (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">{state.error}</p>
          <Button onClick={() => fetchEvents()}>Try Again</Button>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No events found matching your search.</p>
          {searchTerm && (
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;