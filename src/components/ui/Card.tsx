import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const hoverStyles = hoverable
    ? 'transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer'
    : '';
  
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
};

export default Card;