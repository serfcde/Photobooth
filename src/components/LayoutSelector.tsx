'use client';

import { StripLayout } from '@/types/photobooth';

interface LayoutSelectorProps {
  onSelect: (layout: StripLayout) => void;
}

export default function LayoutSelector({ onSelect }: LayoutSelectorProps) {
  const layouts = [
    {
      id: '3-vertical' as StripLayout,
      name: '3 Vertical Strips',
      description: '3 photos stacked vertically',
      icon: '📋',
    },
    {
      id: '4-square' as StripLayout,
      name: '4 Square Layout',
      description: '2x2 square grid',
      icon: '⬜',
    },
    {
      id: '6-half-vertical' as StripLayout,
      name: '6 Half Vertical',
      description: '3 columns x 2 rows',
      icon: '📊',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-white text-center mb-4">
          📸 Photo Booth
        </h1>
        <p className="text-xl text-white text-center mb-12">
          Choose your photo strip layout
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => onSelect(layout.id)}
              className="bg-white rounded-lg p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                {layout.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                {layout.name}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {layout.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
