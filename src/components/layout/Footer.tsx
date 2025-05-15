import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">DanceEvents</h3>
            <p className="text-gray-300">
              Join our community of dancers and enjoy memorable events in elegant venues.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <address className="not-italic text-gray-300">
              <p>Grand Ballroom</p>
              <p>123 Dance Avenue</p>
              <p>Dance City, DC 10001</p>
              <p className="mt-2">Email: info@danceevents.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DanceEvents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;