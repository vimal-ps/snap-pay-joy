
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Camera from '../components/Camera';
import Gallery from '../components/Gallery';
import PaymentModal from '../components/PaymentModal';
import { printPhoto } from '../utils/camera';
import { Camera as CameraIcon, Image } from 'lucide-react';

const Index = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [view, setView] = useState<'camera' | 'gallery'>('camera');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePhotoCapture = (photoDataUrl: string) => {
    setPhotos((prevPhotos) => [photoDataUrl, ...prevPhotos]);
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handlePrintPhoto = (photo: string) => {
    setSelectedPhoto(photo);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedPhoto) {
      // Proceed with printing
      printPhoto(selectedPhoto);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto pt-20 pb-24 px-4 md:px-6">
        <div className="flex justify-center mb-6">
          <div className="flex bg-secondary rounded-full p-1">
            <button
              onClick={() => setView('camera')}
              className={`px-4 py-2 rounded-full flex items-center transition-colors ${
                view === 'camera'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <CameraIcon className="w-4 h-4 mr-2" />
              <span>Camera</span>
            </button>
            <button
              onClick={() => setView('gallery')}
              className={`px-4 py-2 rounded-full flex items-center transition-colors ${
                view === 'gallery'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Image className="w-4 h-4 mr-2" />
              <span>Gallery {photos.length > 0 && `(${photos.length})`}</span>
            </button>
          </div>
        </div>
        
        <div className="relative">
          {view === 'camera' ? (
            <Camera onPhotoCapture={handlePhotoCapture} />
          ) : (
            <Gallery
              photos={photos}
              onBack={() => setView('camera')}
              onDeletePhoto={handleDeletePhoto}
              onPrintPhoto={handlePrintPhoto}
            />
          )}
        </div>
      </main>
      
      <Footer />
      
      {showPaymentModal && selectedPhoto && (
        <PaymentModal
          photo={selectedPhoto}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Index;
