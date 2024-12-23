import { create } from "zustand";
import { Page } from "../App2";

type StateType = {
  currentPage: Page;
  setCurrentPage: (newVal: Page) => void;
};

const useCurrentPageState = create<StateType>((set) => ({
  currentPage: "home",
  setCurrentPage: (newVal: Page) =>
    set((state) => ({ currentPage: newVal })),
}));

export default useCurrentPageState;