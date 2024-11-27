import { create } from "zustand";

type StateType = {
  projectColorsNext: string[];
  setProjectColorsNext: (newVal: string[]) => void;
};

const useProjectColorsNextState = create<StateType>((set) => ({
  projectColorsNext: ["#333", "#999"],
  setProjectColorsNext: (newVal: string[]) =>
    set((state) => ({ projectColorsNext: newVal })),
}));

export default useProjectColorsNextState;