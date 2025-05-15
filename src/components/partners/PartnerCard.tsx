import React from 'react';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Partner } from '../../types';

type PartnerCardProps = {
  partner: Partner;
  onSelect: (partner: Partner) => void;
  selected?: boolean;
};

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onSelect, selected = false }) => {
  const experienceColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-blue-100 text-blue-800',
    advanced: 'bg-purple-100 text-purple-800',
  };

  return (
    <Card 
      className={`transition-all duration-300 h-full flex flex-col ${
        selected 
          ? 'border-2 border-[#7D243A] scale-[1.02] shadow-lg' 
          : partner.available 
            ? 'border border-gray-200 hover:border-[#D4AF37]' 
            : 'border border-gray-200 opacity-60'
      }`}
      hoverable={partner.available}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={partner.imageUrl}
          alt={partner.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${experienceColor[partner.experience]}`}>
          {partner.experience.charAt(0).toUpperCase() + partner.experience.slice(1)}
        </div>
      </div>
      <CardContent className="flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{partner.name}</h3>
        
        <div className="mt-auto">
          <Button 
            onClick={() => partner.available && onSelect(partner)}
            variant={selected ? 'primary' : partner.available ? 'outline' : 'outline'}
            fullWidth
            disabled={!partner.available}
          >
            {selected ? 'Selected' : partner.available ? 'Select Partner' : 'Not Available'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;