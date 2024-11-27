import { create } from "zustand";

type StateType = {
  projectColorsPrev: string[];
  setProjectColorsPrev: (newVal: string[]) => void;
};

const useProjectColorsPrevState = create<StateType>((set) => ({
  projectColorsPrev: ["#333", "#999"],
  setProjectColorsPrev: (newVal: string[]) =>
    set((state) => ({ projectColorsPrev: newVal })),
}));

export default useProjectColorsPrevState;