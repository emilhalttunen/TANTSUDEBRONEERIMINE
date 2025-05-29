import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const { state: authState, register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    setPasswordError('');
    
    if (password !== confirmPassword) {
      setPasswordError('Paroolid ei kattu');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Parool peab olema vähemalt 6 tähemärki pikk');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await register(name, email, password);
      
      if (!authState.error) {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen py-12 flex flex-col justify-center sm:px-6 lg:px-8 bg-[#F5F5DC]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
          Loo uus konto
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Juba on konto olemas?{' '}
          <Link to="/login" className="font-medium text-[#7D243A] hover:text-[#5D142A]">
            Logi sisse
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              label="Täisnimi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              error={passwordError}
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Kinnita parool"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <UserPlus size={20} className="mr-2" />
                    Registreeru
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;