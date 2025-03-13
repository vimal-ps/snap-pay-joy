
import React from 'react';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50 animate-slide-down">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Camera className="h-6 w-6 text-accent" />
          <h1 className="text-lg font-medium">DSLR PhotoBooth</h1>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-muted-foreground">₹5 per print</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
