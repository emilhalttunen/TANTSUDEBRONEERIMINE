import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

type LocationState = {
  from?: {
    pathname: string;
  };
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state: authState, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as LocationState)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      await login(email, password);
      
      if (!authState.error) {
        navigate(from);
      }
    }
  };

  return (
    <div className="min-h-screen py-12 flex flex-col justify-center sm:px-6 lg:px-8 bg-[#F5F5DC]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
          Logi sisse oma kontole
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Või{' '}
          <Link to="/register" className="font-medium text-[#7D243A] hover:text-[#5D142A]">
            registreeri uus konto
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="E-posti aadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Parool"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {authState.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{authState.error}</span>
              </div>
            )}

            <div>
              <Button
                type="submit"
                fullWidth
                disabled={authState.status === 'loading'}
                className="flex justify-center items-center"
              >
                {authState.status === 'loading' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn size={20} className="mr-2" />
                    Logi sisse
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Test konto
                </span>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-sm text-gray-700 mb-1">E-post: test@example.com</p>
              <p className="text-sm text-gray-700">Parool: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;