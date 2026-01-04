import { Design } from '@/types/photobooth';

export const DESIGNS: Design[] = [
  {
    id: 'classic',
    name: 'Classic Black',
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    textColor: '#ffffff',
  },
  {
    id: 'vibrant',
    name: 'Vibrant Pink',
    backgroundColor: '#ff006e',
    borderColor: '#ffffff',
    textColor: '#ffffff',
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    backgroundColor: '#0096c7',
    borderColor: '#ffffff',
    textColor: '#ffffff',
  },
  {
    id: 'forest',
    name: 'Forest Green',
    backgroundColor: '#06a77d',
    borderColor: '#ffffff',
    textColor: '#ffffff',
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    backgroundColor: '#ff7b42',
    borderColor: '#ffffff',
    textColor: '#ffffff',
  },
  {
    id: 'modern',
    name: 'Modern White',
    backgroundColor: '#f8f9fa',
    borderColor: '#333333',
    textColor: '#333333',
  },
];

export const STRIP_LAYOUTS = {
  '3-vertical': {
    count: 3,
    arrangement: { columns: 1, rows: 3 },
    width: 400,
    height: 500,
  },
  '4-square': {
    count: 4,
    arrangement: { columns: 2, rows: 2 },
    width: 500,
    height: 500,
  },
  '6-half-vertical': {
    count: 6,
    arrangement: { columns: 3, rows: 2 },
    width: 600,
    height: 400,
  },
};
