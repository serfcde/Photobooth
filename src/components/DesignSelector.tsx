'use client';

import { Design } from '@/types/photobooth';
import { DESIGNS } from '@/constants/designs';

interface DesignSelectorProps {
  onSelect: (design: Design) => void;
  onBack: () => void;
}

export default function DesignSelector({
  onSelect,
  onBack,
}: DesignSelectorProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Choose Your Design
        </h1>
        <p className="text-gray-600 mb-12">
          Select a theme for your photo strips
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESIGNS.map((design) => (
            <button
              key={design.id}
              onClick={() => onSelect(design)}
              className="group cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div
                className="w-full h-48 rounded-lg shadow-lg border-4 border-gray-300 group-hover:border-4 group-hover:border-gray-800 transition-all flex flex-col items-center justify-center p-4"
                style={{
                  backgroundColor: design.backgroundColor,
                  borderColor: design.borderColor,
                }}
              >
                <div
                  className="text-sm font-bold"
                  style={{ color: design.textColor }}
                >
                  Sample Text
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
                {design.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
