'use client';

import { useRef, useState, useEffect } from 'react';
import { Design } from '@/types/photobooth';
import { STRIP_LAYOUTS } from '@/constants/designs';
import { StripLayout } from '@/types/photobooth';

interface PhotoEditorProps {
  photos: string[];
  layout: StripLayout;
  design: Design;
  text: string;
  onBack: () => void;
}

export default function PhotoEditor({
  photos,
  layout,
  design,
  text,
  onBack,
}: PhotoEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [canDownload, setCanDownload] = useState(false);

  const layoutConfig = STRIP_LAYOUTS[layout];
  const photoSize = {
    width: layoutConfig.width / layoutConfig.arrangement.columns,
    height: layoutConfig.height / layoutConfig.arrangement.rows,
  };

  const applyFilter = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return img.src;

    ctx.drawImage(img, 0, 0);

    if (isBlackAndWhite) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    return canvas.toDataURL('image/jpeg');
  };

  const downloadStrip = async () => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = layoutConfig.width;
    canvas.height = layoutConfig.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Draw background
    ctx.fillStyle = design.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = design.borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw photos
    const images = containerRef.current.querySelectorAll('img');
    let photoIndex = 0;

    for (let row = 0; row < layoutConfig.arrangement.rows; row++) {
      for (let col = 0; col < layoutConfig.arrangement.columns; col++) {
        if (photoIndex < photos.length && images[photoIndex]) {
          const img = images[photoIndex] as HTMLImageElement;
          const x = col * photoSize.width;
          const y = row * photoSize.height;

          // Draw photo with filter
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = photoSize.width;
          tempCanvas.height = photoSize.height;
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            tempCtx.drawImage(img, 0, 0, photoSize.width, photoSize.height);
            if (isBlackAndWhite) {
              const imageData = tempCtx.getImageData(
                0,
                0,
                photoSize.width,
                photoSize.height
              );
              const data = imageData.data;
              for (let i = 0; i < data.length; i += 4) {
                const gray =
                  data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
              }
              tempCtx.putImageData(imageData, 0, 0);
            }
            ctx.drawImage(tempCanvas, x, y);
          }

          // Draw photo border
          ctx.strokeStyle = design.borderColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, photoSize.width, photoSize.height);

          photoIndex++;
        }
      }
    }

    // Draw text
    if (text) {
      ctx.fillStyle = design.textColor;
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const textY = canvas.height - 15;
      ctx.fillText(text, canvas.width / 2, textY);
    }

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.download = `photobooth-${Date.now()}.jpg`;
    link.click();
  };

  useEffect(() => {
    setCanDownload(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Photo Strip Preview */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-2xl p-4">
              <div
                ref={containerRef}
                className="mx-auto"
                style={{
                  width: `${layoutConfig.width}px`,
                  height: `${layoutConfig.height}px`,
                  backgroundColor: design.backgroundColor,
                  border: `3px solid ${design.borderColor}`,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${layoutConfig.arrangement.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${layoutConfig.arrangement.rows}, 1fr)`,
                  gap: '2px',
                  padding: '4px',
                }}
              >
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="overflow-hidden"
                    style={{
                      border: `2px solid ${design.borderColor}`,
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        filter: isBlackAndWhite ? 'grayscale(100%)' : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Text at bottom */}
              {text && (
                <div
                  className="text-center mt-4 font-bold text-lg"
                  style={{ color: design.textColor }}
                >
                  {text}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Effects & Download
              </h2>

              {/* Filter Toggle */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBlackAndWhite}
                    onChange={(e) => setIsBlackAndWhite(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-medium">
                    Black & White
                  </span>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  {isBlackAndWhite
                    ? 'Grayscale filter applied'
                    : 'HD color mode'}
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadStrip}
                disabled={!canDownload}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold mb-4 disabled:opacity-50"
              >
                ⬇️ Download Photo Strip
              </button>

              {/* Restart Button */}
              <button
                onClick={onBack}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                🔄 Create Another
              </button>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Layout:</span>
                  <p className="text-gray-600">{layout}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Design:</span>
                  <p className="text-gray-600">{design.name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Photos:</span>
                  <p className="text-gray-600">{photos.length} captured</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Effect:</span>
                  <p className="text-gray-600">
                    {isBlackAndWhite ? 'Black & White' : 'HD Color'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
