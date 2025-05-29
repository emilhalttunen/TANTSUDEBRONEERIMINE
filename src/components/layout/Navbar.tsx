import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-serif text-[#7D243A] font-bold">
          Tantsuüritused
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
          >
            Avaleht
          </Link>
          <Link 
            to="/events" 
            className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
          >
            Üritused
          </Link>
          
          {state.isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300 flex items-center"
              >
                <User size={18} className="mr-1" />
                Profiil
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300"
              >
                Logi välja
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
              >
                Logi sisse
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300"
              >
                Registreeru
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="focus:outline-none"
            aria-label={isMenuOpen ? "Sulge menüü" : "Ava menüü"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50 py-4 px-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Avaleht
          </Link>
          <Link 
            to="/events" 
            className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Üritused
          </Link>
          
          {state.isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-1" />
                Profiil
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300 text-left"
              >
                Logi välja
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Logi sisse
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300 inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Registreeru
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;