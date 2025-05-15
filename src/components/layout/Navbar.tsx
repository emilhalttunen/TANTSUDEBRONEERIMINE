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
          DanceEvents
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
          >
            Events
          </Link>
          
          {state.isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300 flex items-center"
              >
                <User size={18} className="mr-1" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
            Home
          </Link>
          <Link 
            to="/events" 
            className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          
          {state.isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-1" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-[#7D243A] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-[#7D243A] text-white rounded hover:bg-[#5D142A] transition-colors duration-300 inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;