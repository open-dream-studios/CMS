import { create } from "zustand";

type StateType = {
  selectedProject: number | null;
  setSelectedProject: (newVal: number | null) => void;
};

const useSelectedProjectState = create<StateType>((set) => ({
  selectedProject: null,
  setSelectedProject: (newVal: number | null) =>
    set((state) => ({ selectedProject: newVal })),
}));

export default useSelectedProjectState;