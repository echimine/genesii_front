import { create } from 'zustand';

interface PhotoState {
  image: string | null;
  setImage: (img: string | null) => void;
  capture: (() => void) | null;
  setCaptureFunction: (fn: () => void) => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  image: null,
  setImage: (img) => set({ image: img }),
  capture: null,
  setCaptureFunction: (fn) => set({ capture: fn }),
}));
