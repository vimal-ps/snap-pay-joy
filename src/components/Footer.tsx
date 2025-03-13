
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 bg-background/80 backdrop-blur-md border-t border-border/50 animate-slide-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="text-xs text-muted-foreground mb-2 sm:mb-0">
          Powered by cutting-edge technology
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} DSLR PhotoBooth
        </div>
      </div>
    </footer>
  );
};

export default Footer;
