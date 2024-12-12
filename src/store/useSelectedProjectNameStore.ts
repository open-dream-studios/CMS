import { create } from "zustand";

type StateType = {
  selectedProjectName: [number | null, number | null, number | null];
  setSelectedProjectName: (newVal: [number | null, number | null, number | null]) => void;};

const useSelectedProjectNameState = create<StateType>((set) => ({
  selectedProjectName: [null, null, null],
  setSelectedProjectName: (newVal: [number | null, number | null, number | null]) =>
    set((state) => ({ selectedProjectName: newVal })),
}));

export default useSelectedProjectNameState;