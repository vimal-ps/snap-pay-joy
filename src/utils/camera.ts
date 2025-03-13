
let stream: MediaStream | null = null;

/**
 * Start the camera stream
 */
export const startCamera = async (videoElement: HTMLVideoElement | null): Promise<boolean> => {
  if (!videoElement) return false;
  
  try {
    // Stop any existing stream first
    if (stream) {
      stopCamera();
    }
    
    // Get user media with constraints
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: "user"
      },
      audio: false
    });
    
    // Assign the stream to the video element
    videoElement.srcObject = stream;
    
    // Wait for video to be ready
    return new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        videoElement.play().then(() => resolve(true));
      };
    });
  } catch (error) {
    console.error("Error accessing camera:", error);
    return false;
  }
};

/**
 * Stop the camera stream
 */
export const stopCamera = (): void => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
};

/**
 * Capture a photo from the video stream
 */
export const capturePhoto = (videoElement: HTMLVideoElement | null): string | null => {
  if (!videoElement) return null;
  
  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    // Draw the video frame to the canvas
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // Convert the canvas to a data URL
    return canvas.toDataURL('image/jpeg', 0.9);
  } catch (error) {
    console.error("Error capturing photo:", error);
    return null;
  }
};

/**
 * Switch camera between front and back
 */
export const switchCamera = async (videoElement: HTMLVideoElement | null): Promise<boolean> => {
  if (!videoElement || !stream) return false;
  
  // Get current facingMode
  const currentTrack = stream.getVideoTracks()[0];
  const settings = currentTrack.getSettings();
  const currentFacingMode = settings.facingMode;
  
  // Set new facingMode
  const newFacingMode = currentFacingMode === "user" ? "environment" : "user";
  
  // Stop current stream
  stopCamera();
  
  // Start new stream with the opposite facing mode
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: newFacingMode
      },
      audio: false
    });
    
    videoElement.srcObject = stream;
    return true;
  } catch (error) {
    console.error("Error switching camera:", error);
    // Try to revert to the previous camera if switching fails
    startCamera(videoElement);
    return false;
  }
};

/**
 * Print a photo
 */
export const printPhoto = (photoDataUrl: string): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error("Unable to open print window");
    return;
  }
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Photo</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          img {
            max-width: 100%;
            max-height: 100vh;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${photoDataUrl}" />
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
    </html>
  `);
  
  printWindow.document.close();
};
