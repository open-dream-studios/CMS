import { create } from "zustand";
import { FileTree } from "../App";

type StateType = {
  projectAssets: FileTree | null;  
  setProjectAssets: (newVal: FileTree | null) => void;
};

const useProjectAssetsStore = create<StateType>((set) => ({
  projectAssets: null,  
  setProjectAssets: (newVal: FileTree | null) =>
    set(() => ({ projectAssets: newVal })),
}));

export default useProjectAssetsStore;