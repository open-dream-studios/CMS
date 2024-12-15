import { create } from "zustand";

type StateType = {
  incomingSpeed: any[];
  setIncomingSpeed: (newVal: any[]) => void;
};

const useIncomingImageSpeedState = create<StateType>((set) => ({
  incomingSpeed: [],
  setIncomingSpeed: (newVal: any[]) =>
    set((state) => ({ incomingSpeed: newVal })),
}));

export default useIncomingImageSpeedState;