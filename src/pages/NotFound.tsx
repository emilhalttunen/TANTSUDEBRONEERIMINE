import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-9xl font-serif font-bold text-[#7D243A]">404</h1>
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto my-6"></div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          onClick={() => navigate('/')}
          size="lg"
          className="inline-flex items-center"
        >
          <Home size={20} className="mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;