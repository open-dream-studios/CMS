import { create } from "zustand";
import { TreeNode } from "../App";

type StateType = {
  cloudinaryData: TreeNode | null;  
  setCloudinaryData: (newVal: TreeNode | null) => void;
};

const useCloudinaryDataStore = create<StateType>((set) => ({
  cloudinaryData: null,  
  setCloudinaryData: (newVal: TreeNode | null) =>
    set(() => ({ cloudinaryData: newVal })),
}));

export default useCloudinaryDataStore;