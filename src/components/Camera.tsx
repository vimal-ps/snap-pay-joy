
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Loader2, RefreshCw, Camera as CameraIcon } from 'lucide-react';
import CaptureButton from './CaptureButton';
import { startCamera, stopCamera, capturePhoto, switchCamera } from '../utils/camera';

interface CameraProps {
  onPhotoCapture: (photoDataUrl: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onPhotoCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const initializeCamera = useCallback(async () => {
    setIsLoading(true);
    setCameraError(false);
    const success = await startCamera(videoRef.current);
    if (!success) {
      setCameraError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initializeCamera();
    
    return () => {
      stopCamera();
    };
  }, [initializeCamera]);

  const handleCapture = async () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    
    // Flash effect
    const flashElement = document.createElement('div');
    flashElement.className = 'absolute inset-0 bg-white z-20';
    flashElement.style.animation = 'flash 0.5s';
    
    // Create a style element for the flash animation
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes flash {
        0% { opacity: 0; }
        10% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    
    document.head.appendChild(styleElement);
    videoRef.current?.parentElement?.appendChild(flashElement);
    
    // Capture photo after a small delay for the flash effect
    setTimeout(() => {
      const photoDataUrl = capturePhoto(videoRef.current);
      if (photoDataUrl) {
        onPhotoCapture(photoDataUrl);
      }
      
      // Remove flash effect
      flashElement.remove();
      styleElement.remove();
      setIsCapturing(false);
    }, 300);
  };

  const handleSwitchCamera = async () => {
    setIsLoading(true);
    await switchCamera(videoRef.current);
    setIsLoading(false);
  };

  const handleRetryCamera = () => {
    initializeCamera();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-[3/4] overflow-hidden rounded-2xl bg-black camera-container animate-scale-in">
      {cameraError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 text-center p-6">
          <CameraIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Camera Access Denied</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Please allow camera access to use the photobooth.
          </p>
          <button
            onClick={handleRetryCamera}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="object-cover w-full h-full camera-lens"
            playsInline
            muted
          />
          
          {isLoading && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-accent animate-spin" />
              <span className="ml-2 text-sm font-medium">Initializing camera...</span>
            </div>
          )}
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center">
            <CaptureButton onClick={handleCapture} isCapturing={isCapturing} />
          </div>
          
          <button
            onClick={handleSwitchCamera}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Switch camera"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default Camera;
