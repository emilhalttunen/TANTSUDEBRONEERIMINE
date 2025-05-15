import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import Button from '../components/ui/Button';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/events/EventCard';

const Home: React.FC = () => {
  const { state, fetchEvents } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.events.length === 0) {
      fetchEvents();
    }
  }, [fetchEvents, state.events.length]);

  const featuredEvent = state.events[0]; // Use the first event as featured

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="bg-cover bg-center h-[90vh] relative flex items-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/7118836/pexels-photo-7118836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` 
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="animate-fadeIn">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Elegant Dance Events
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join us for an unforgettable experience of dance, music, and elegance. 
              Reserve your spot for upcoming events today.
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/events')}
              className="animate-pulse"
            >
              Browse Events
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="py-16 bg-[#F5F5DC]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
              Featured Event
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12"></div>
            
            <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-[1.01]">
              <div className="lg:w-1/2">
                <img
                  src={featuredEvent.imageUrl}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gray-800">
                  {featuredEvent.title}
                </h3>
                <div className="flex items-center mb-4 text-gray-600">
                  <CalendarDays size={24} className="mr-2 text-[#7D243A]" />
                  <span className="text-lg">
                    {new Date(featuredEvent.date).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} at {featuredEvent.time}
                  </span>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  {featuredEvent.description}
                </p>
                <div>
                  <Button 
                    onClick={() => navigate(`/events/${featuredEvent.id}`)}
                    size="lg"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dance Styles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
            Popular Dance Styles
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">W</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Waltz</h3>
              <p className="text-gray-700">An elegant, smooth dance characterized by long, flowing movements and rise &amp; fall.</p>
            </div>
            
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">T</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Tango</h3>
              <p className="text-gray-700">A passionate, dramatic dance with sharp movements and intense expressions.</p>
            </div>
            
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">S</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Samba</h3>
              <p className="text-gray-700">A lively, rhythmical dance of Brazilian origin with characteristic bounce and hip movements.</p>
            </div>
            
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">C</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cha-Cha-Cha</h3>
              <p className="text-gray-700">A fun, flirtatious dance with Cuban origins, known for its distinctive chassis steps.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/events')}
            >
              Find Dance Events
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
            Upcoming Events
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12"></div>
          
          {state.status === 'loading' ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D243A]"></div>
            </div>
          ) : state.events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.events.slice(0, 3).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700">No upcoming events found.</p>
          )}
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/events')}
              size="lg"
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
            What Our Dancers Say
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#7D243A] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold">Maria S.</h4>
                  <p className="text-sm text-gray-600">Dance Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The Fall Ball was an incredible experience! The venue was beautiful, the music was perfect, and I found a great dance partner. Can't wait for the next event!"
              </p>
            </div>
            
            <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#7D243A] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-bold">James T.</h4>
                  <p className="text-sm text-gray-600">Tango Specialist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a dance instructor, I appreciate the attention to detail at these events. The partner matching system works brilliantly, and my students love attending."
              </p>
            </div>
            
            <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#7D243A] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-bold">Elena K.</h4>
                  <p className="text-sm text-gray-600">Beginner Dancer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Even as a complete beginner, I felt welcome and comfortable. Found a patient partner who helped me learn the basics of waltz. A magical evening!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-16 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/1867712/pexels-photo-1867712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` 
        }}
      >
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Ready to Join the Dance?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Register now to book your spot at our upcoming events and find the perfect dance partner.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/register')}
            >
              Register Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-black"
              onClick={() => navigate('/events')}
            >
              Browse Events
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;