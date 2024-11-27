import { create } from "zustand";

type StateType = {
  projectColors: string[];
  setProjectColors: (newVal: string[]) => void;
};

const useProjectColorsState = create<StateType>((set) => ({
  projectColors: ["#333", "#999"],
  setProjectColors: (newVal: string[]) =>
    set((state) => ({ projectColors: newVal })),
}));

export default useProjectColorsState;