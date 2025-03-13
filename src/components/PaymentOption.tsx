
import React from 'react';

interface PaymentOptionProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ 
  id, 
  name, 
  icon, 
  selected, 
  onSelect 
}) => {
  return (
    <button
      onClick={onSelect}
      className={`payment-option w-full p-4 rounded-xl border-2 ${
        selected 
          ? 'border-accent bg-accent/5' 
          : 'border-border bg-card hover:border-border/80'
      } transition-all duration-200`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-3 text-2xl">
          {icon}
        </div>
        <span className={`text-sm font-medium ${selected ? 'text-accent' : 'text-foreground'}`}>
          {name}
        </span>
      </div>
    </button>
  );
};

export default PaymentOption;
