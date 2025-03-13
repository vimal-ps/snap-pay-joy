
import React from 'react';

interface CaptureButtonProps {
  onClick: () => void;
  isCapturing?: boolean;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({ onClick, isCapturing = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={isCapturing}
      className="capture-button relative flex items-center justify-center w-20 h-20 focus:outline-none"
      aria-label="Capture photo"
    >
      <div className="absolute inset-0 rounded-full bg-white opacity-80"></div>
      <div className={`relative z-10 w-16 h-16 rounded-full border-4 border-white bg-white transition-all duration-300 ${isCapturing ? 'scale-90 border-accent' : 'hover:scale-105'}`}>
        <div className={`absolute inset-0 rounded-full bg-accent/10 transition-opacity ${isCapturing ? 'animate-pulse-light' : ''}`}></div>
      </div>
    </button>
  );
};

export default CaptureButton;
