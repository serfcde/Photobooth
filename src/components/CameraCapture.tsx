'use client';

import { useEffect, useRef, useState } from 'react';
import { STRIP_LAYOUTS } from '@/constants/designs';
import { StripLayout } from '@/types/photobooth';

interface CameraCaptureProps {
  layout: StripLayout;
  totalPhotos: number;
  onPhotosCapture: (photos: string[]) => void;
  onBack: () => void;
}

export default function CameraCapture({
  layout,
  totalPhotos,
  onPhotosCapture,
  onBack,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startedRef = useRef(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string>('');
  const [isInitializing, setIsInitializing] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const startCamera = async () => {
    try {
      setError('');
      setIsInitializing(true);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video data to load
        videoRef.current.onloadeddata = async () => {
          try {
            await videoRef.current?.play();
            setIsCameraReady(true);
            setIsInitializing(false);
          } catch (err) {
            console.error('Error playing video:', err);
            setIsCameraReady(true);
            setIsInitializing(false);
          }
        };
      }
    } catch (err: unknown) {
      setIsInitializing(false);
      
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access in your browser settings.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera found on this device.');
        } else if (err.name === 'NotReadableError') {
          setError('Camera is already in use by another application.');
        } else {
          setError(`Camera error: ${err.message}`);
        }
      } else {
        setError('Unable to access camera. Please check permissions and try again.');
      }
    }
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (photos.length < totalPhotos) {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            captureFrame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.95);
        const newPhotos = [...photos, imageData];
        setPhotos(newPhotos);

        if (newPhotos.length === totalPhotos) {
          setTimeout(() => {
            onPhotosCapture(newPhotos);
          }, 500);
        }
      }
    }
  };

  const retakePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const layoutConfig = STRIP_LAYOUTS[layout];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 mb-6"
          >
            <span>←</span> Back
          </button>

          <div className="text-center sm:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-2 tracking-tighter">
              📸 CAPTURE
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 font-light">
              Photo {photos.length + 1} of {totalPhotos}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-2xl">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
              style={{ width: `${(photos.length / totalPhotos) * 100}%` }}
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-500/20 border border-red-500/50 rounded-2xl backdrop-blur-sm">
            <p className="text-white font-semibold mb-4">{error}</p>
            <button
              onClick={startCamera}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Camera Section */}
          <div className="lg:col-span-2">
            {/* Camera Preview */}
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-8">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  isCameraReady ? 'block' : 'hidden'
                }`}
                style={{ transform: 'scaleX(-1)' }}
              />

              {!isCameraReady && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto animate-pulse">
                      <div className="text-5xl">⚙️</div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">Initializing</p>
                    <p className="text-gray-400">Please allow camera access</p>
                  </div>
                </div>
              )}

              {/* Countdown Overlay */}
              {countdown > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-9xl font-black text-white animate-ping">
                    {countdown}
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Capture Button */}
            {isCameraReady && photos.length < totalPhotos && (
              <button
                onClick={capturePhoto}
                disabled={countdown > 0}
                className="w-full py-5 sm:py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl disabled:cursor-wait"
              >
                {countdown > 0 ? `📸 ${countdown}...` : `📸 Capture (${photos.length + 1}/${totalPhotos})`}
              </button>
            )}

            {/* Proceed Button */}
            {photos.length === totalPhotos && (
              <button
                onClick={() => onPhotosCapture(photos)}
                className="w-full py-5 sm:py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
              >
                ✅ Proceed to Editor
              </button>
            )}
          </div>

          {/* Captured Photos Strip */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/10 backdrop-blur-sm shadow-2xl">
                <h2 className="text-white font-black text-2xl mb-6">STRIP</h2>

                {photos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-3">🎬</div>
                    <p className="text-gray-400 font-medium">No photos yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {photos.map((photo, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg border-2 border-white/20 bg-black"
                      >
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{ transform: 'scaleX(-1)' }}
                        />
                        <button
                          onClick={() => retakePhoto(index)}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                        >
                          <span className="text-white font-bold text-lg">🔄 Retake</span>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                          <p className="text-xs font-bold text-white text-center">#{index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
}

