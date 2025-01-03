// import { create } from "zustand";
// import { Tree } from "../App";

// type StateType = {
//   projectAssets: Tree | null;  
//   setProjectAssets: (newVal: Tree | null) => void;
// };

// const useProjectAssetsStore = create<StateType>((set) => ({
//   projectAssets: null,  
//   setProjectAssets: (newVal: Tree | null) =>
//     set(() => ({ projectAssets: newVal })),
// }));

// export default useProjectAssetsStore;

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

