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

  const featuredEvent = state.events[0];

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
              Elegantsed Tantsuüritused
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Liitu meiega unustamatu tantsu, muusika ja elegantsuse kogemiseks. 
              Broneeri koht tulevatele üritustele juba täna.
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/events')}
              className="animate-pulse"
            >
              Vaata Üritusi
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="py-16 bg-[#F5F5DC]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
              Esiletõstetud Üritus
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
                    {new Date(featuredEvent.date).toLocaleDateString('et-EE', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} kell {featuredEvent.time}
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
                    Vaata Lähemalt
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
            Populaarsed Tantsustiilid
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">V</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Valss</h3>
              <p className="text-gray-700">Elegantne, sujuv tants, mida iseloomustavad pikad, voolavad liigutused ja tõusud-langused.</p>
            </div>
            
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">T</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Tango</h3>
              <p className="text-gray-700">Kirglik, dramaatiline tants teravate liigutuste ja intensiivsete väljendustega.</p>
            </div>
            
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">S</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Samba</h3>
              <p className="text-gray-700">Elav, rütmiline Brasiilia päritolu tants iseloomuliku põrke ja puusaliigutustega.</p>
            </div>
            
            <div className="bg-[#F5F5DC] rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-[#7D243A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-serif text-2xl">C</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cha-Cha-Cha</h3>
              <p className="text-gray-700">Lõbus, flirtiv Kuuba päritolu tants, tuntud oma iseloomuliku chassé sammude poolest.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/events')}
            >
              Leia Tantsuüritusi
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
            Tulevased Üritused
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
            <p className="text-center text-gray-700">Tulevasi üritusi ei leitud.</p>
          )}
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/events')}
              size="lg"
            >
              Vaata Kõiki Üritusi
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
            Mida Meie Tantsijad Ütlevad
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
                  <p className="text-sm text-gray-600">Tantsuentusiast</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Sügiball oli uskumatu kogemus! Koht oli kaunis, muusika täiuslik ja leidsin suurepärase tantsupartneri. Ootan põnevusega järgmist üritust!"
              </p>
            </div>
            
            <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#7D243A] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-bold">Jaan T.</h4>
                  <p className="text-sm text-gray-600">Tango Spetsialist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Tantsuõpetajana hindan nende ürituste pisidetailideni läbimõeldust. Partnerite sobitamise süsteem töötab suurepäraselt ja mu õpilased armastavad siin käia."
              </p>
            </div>
            
            <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#7D243A] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-bold">Erika K.</h4>
                  <p className="text-sm text-gray-600">Algaja Tantsija</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Isegi täiesti algajana tundsin end teretulnuna ja mugavalt. Leidsin kannatlikku partneri, kes aitas mul valssi õppida. Võluv õhtu!"
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
            Valmis Tantsima?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Registreeru kohe, et broneerida koht meie tulevastel üritustel ja leida endale sobiv tantsupartner.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/register')}
            >
              Registreeru Nüüd
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-black"
              onClick={() => navigate('/events')}
            >
              Vaata Üritusi
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;