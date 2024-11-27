import { create } from "zustand";

type StateType = {
  selectedProject: number | null;
  setSelectedProject: (newVal: number) => void;
};

const useSelectedProjectState = create<StateType>((set) => ({
  selectedProject: null,
  setSelectedProject: (newVal: number) =>
    set((state) => ({ selectedProject: newVal })),
}));

export default useSelectedProjectState;