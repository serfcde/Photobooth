'use client';

import { useState } from 'react';
import { StripLayout, Design, PhotoBoothState } from '@/types/photobooth';
import { STRIP_LAYOUTS } from '@/constants/designs';
import LayoutSelector from '@/components/LayoutSelector';
import DesignSelector from '@/components/DesignSelector';
import TextInput from '@/components/TextInput';
import CameraCapture from '@/components/CameraCapture';
import PhotoEditor from '@/components/PhotoEditor';

type Step = 'layout' | 'design' | 'text' | 'camera' | 'editor';

export default function Home() {
  const [step, setStep] = useState<Step>('layout');
  const [state, setState] = useState<PhotoBoothState>({
    layout: null,
    design: null,
    text: '',
    photos: [],
    isBlackAndWhite: false,
  });

  const handleLayoutSelect = (layout: StripLayout) => {
    setState((prev) => ({ ...prev, layout }));
    setStep('design');
  };

  const handleDesignSelect = (design: Design) => {
    setState((prev) => ({ ...prev, design }));
    setStep('text');
  };

  const handleTextSubmit = (text: string) => {
    setState((prev) => ({ ...prev, text }));
    setStep('camera');
  };

  const handlePhotosCapture = (photos: string[]) => {
    setState((prev) => ({ ...prev, photos }));
    setStep('editor');
  };

  const handleBack = () => {
    if (step === 'design') setStep('layout');
    else if (step === 'text') setStep('design');
    else if (step === 'camera') setStep('text');
    else if (step === 'editor') {
      setStep('layout');
      setState({
        layout: null,
        design: null,
        text: '',
        photos: [],
        isBlackAndWhite: false,
      });
    }
  };

  const getPhotoCount = () => {
    if (!state.layout) return 0;
    return STRIP_LAYOUTS[state.layout].count;
  };

  return (
    <main>
      {step === 'layout' && <LayoutSelector onSelect={handleLayoutSelect} />}

      {step === 'design' && (
        <DesignSelector
          onSelect={handleDesignSelect}
          onBack={handleBack}
        />
      )}

      {step === 'text' && (
        <TextInput onSubmit={handleTextSubmit} onBack={handleBack} />
      )}

      {step === 'camera' && state.layout && (
        <CameraCapture
          layout={state.layout}
          totalPhotos={getPhotoCount()}
          onPhotosCapture={handlePhotosCapture}
          onBack={handleBack}
        />
      )}

      {step === 'editor' && state.layout && state.design && (
        <PhotoEditor
          photos={state.photos}
          layout={state.layout}
          design={state.design}
          text={state.text}
          onBack={handleBack}
        />
      )}
    </main>
  );
}
