import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Tantsuüritused</h3>
            <p className="text-gray-300">
              Liitu meie tantsijate kogukonnaga ja naudi meeldejäävaid üritusi elegantsetes kohtades.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Kiirlingid</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Avaleht
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Üritused
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Logi sisse
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Registreeru
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Kontakt</h4>
            <address className="not-italic text-gray-300">
              <p>Grand Ballroom</p>
              <p>Tantsu tänav 123</p>
              <p>Tallinn, 10001</p>
              <p className="mt-2">E-post: info@tantsuüritused.ee</p>
              <p>Telefon: +372 5123 4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Tantsuüritused. Kõik õigused kaitstud.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;