import { create } from "zustand";

type StateType = {
  selectedArchiveGroup: number | null;
  setSelectedArchiveGroup: (newVal: number | null) => void;};

const useSelectedArchiveGroupStore = create<StateType>((set) => ({
  selectedArchiveGroup: null,
  setSelectedArchiveGroup: (newVal: number | null) =>
    set((state) => ({ selectedArchiveGroup: newVal })),
}));

export default useSelectedArchiveGroupStore;