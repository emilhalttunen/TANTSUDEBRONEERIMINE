import React from 'react';

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time';
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7D243A] focus:border-[#7D243A] ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;