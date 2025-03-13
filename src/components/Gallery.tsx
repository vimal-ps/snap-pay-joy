
import React, { useState } from 'react';
import { X, Trash2, Printer } from 'lucide-react';

interface GalleryProps {
  photos: string[];
  onBack: () => void;
  onDeletePhoto: (index: number) => void;
  onPrintPhoto: (photo: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ 
  photos, 
  onBack, 
  onDeletePhoto, 
  onPrintPhoto 
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    photos.length > 0 ? 0 : null
  );

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-lg font-medium mb-4">No photos yet</h3>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Back to Camera
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-xl mx-auto h-full animate-fade-in">
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Back to camera"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {selectedIndex !== null && (
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl mb-4 photo-shadow">
          <img 
            src={photos[selectedIndex]} 
            alt={`Photo ${selectedIndex + 1}`} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between bg-gradient-to-t from-black/60 to-transparent">
            <button
              onClick={() => onDeletePhoto(selectedIndex)}
              className="p-2 rounded-full bg-red-500/70 text-white hover:bg-red-500/90 transition-colors"
              aria-label="Delete photo"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => onPrintPhoto(photos[selectedIndex])}
              className="p-2 rounded-full bg-accent/70 text-white hover:bg-accent/90 transition-colors"
              aria-label="Print photo"
            >
              <Printer className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">All Photos</h3>
        <div className="grid grid-cols-4 gap-2 overflow-x-auto no-scrollbar pb-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-[3/4] rounded-md overflow-hidden transition-all duration-200 ${
                selectedIndex === index
                  ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                  : 'opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
