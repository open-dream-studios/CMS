import { create } from "zustand";

interface ImageDimension {
  width: number;
  height: number;
  src: string;
}

type StateType = {
  incomingImageDimensions: ImageDimension[]
  setIncomingImageDimensions: (newVal:ImageDimension[]) => void;
};

const useIncomingImageDimensionsState = create<StateType>((set) => ({
  incomingImageDimensions: [],
  setIncomingImageDimensions: (newVal: ImageDimension[]) =>
    set((state) => ({ incomingImageDimensions: newVal })),
}));

export default useIncomingImageDimensionsState;