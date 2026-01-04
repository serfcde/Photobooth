export type StripLayout = '3-vertical' | '4-square' | '6-half-vertical';

export interface Design {
  id: string;
  name: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  pattern?: string;
}

export interface PhotoBoothState {
  layout: StripLayout | null;
  design: Design | null;
  text: string;
  photos: string[]; // base64 encoded photos
  isBlackAndWhite: boolean;
}

export interface StripDimensions {
  width: number;
  height: number;
  count: number;
  arrangement: {
    columns: number;
    rows: number;
  };
}
