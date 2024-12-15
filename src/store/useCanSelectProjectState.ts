import { create } from "zustand";

type StateType = {
  canSelectProject: boolean;
  setCanSelectProject: (newVal: boolean) => void;
};

const useCanSelectProjectState = create<StateType>((set) => ({
  canSelectProject: true,
  setCanSelectProject: (newVal: boolean) =>
    set((state) => ({ canSelectProject: newVal })),
}));

export default useCanSelectProjectState;