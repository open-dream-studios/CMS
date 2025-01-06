import { create } from "zustand";
import { TreeNode } from "../App";

type StateType = {
  projectAssets: TreeNode | null;  
  setProjectAssets: (newVal: TreeNode | null) => void;
};

const useProjectAssetsStore = create<StateType>((set) => ({
  projectAssets: null,  
  setProjectAssets: (newVal: TreeNode | null) =>
    set(() => ({ projectAssets: newVal })),
}));

export default useProjectAssetsStore;

