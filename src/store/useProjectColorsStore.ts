import { create } from "zustand";
type ProjectColors = [
  [string, string],
  [string, string],
  [string, string]
];

type StateType = {
  projectColors: ProjectColors;
  setProjectColors: (newVal: ProjectColors) => void;
};

const useProjectColorsState = create<StateType>((set) => ({
  projectColors: [["white", "white"],["white", "white"],["white", "white"]],
  setProjectColors: (newVal: ProjectColors) =>
    set((state) => ({ projectColors: newVal })),
}));

export default useProjectColorsState;
