import React from 'react';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Dance } from '../../types';

type DanceCardProps = {
  dance: Dance;
  onSelect: (dance: Dance) => void;
  selected?: boolean;
};

const DanceCard: React.FC<DanceCardProps> = ({ dance, onSelect, selected = false }) => {
  return (
    <Card 
      className={`transition-all duration-300 h-full flex flex-col ${
        selected 
          ? 'border-2 border-[#7D243A] scale-[1.02] shadow-lg' 
          : 'border border-gray-200 hover:border-[#D4AF37]'
      }`}
      hoverable
    >
      <div className="h-40 overflow-hidden">
        <img
          src={dance.imageUrl}
          alt={dance.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{dance.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{dance.description}</p>
        <div className="mt-auto">
          <Button 
            onClick={() => onSelect(dance)}
            variant={selected ? 'primary' : 'outline'}
            fullWidth
          >
            {selected ? 'Selected' : 'Select Dance'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DanceCard;