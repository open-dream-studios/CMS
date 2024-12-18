import { create } from "zustand";

type StateType = {
  preloadedImages:boolean[]
  setPreloadedImages: (newVal: boolean[]) => void;
};

const usePreloadedImagesStore = create<StateType>((set) => ({
  preloadedImages: [false, false, false],
  setPreloadedImages: (newVal: boolean[]) =>
    set((state) => ({ preloadedImages: newVal })),
}));

export default usePreloadedImagesStore;
