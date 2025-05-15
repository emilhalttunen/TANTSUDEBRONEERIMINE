import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
}) => {
  const baseStyles = 'font-medium rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantStyles = {
    primary: 'bg-[#7D243A] hover:bg-[#5D142A] text-white focus:ring-[#7D243A]',
    secondary: 'bg-[#D4AF37] hover:bg-[#B4901F] text-white focus:ring-[#D4AF37]',
    outline: 'border border-[#7D243A] text-[#7D243A] hover:bg-[#7D243A] hover:text-white focus:ring-[#7D243A]',
    link: 'text-[#7D243A] hover:underline focus:ring-[#7D243A] bg-transparent',
  };
  
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;