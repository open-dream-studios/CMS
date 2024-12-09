import { create } from "zustand";

type StateType = {
  projectCovers: any;
  setProjectCovers: (newVal: any) => void;
};

const useProjectCoversState = create<StateType>((set) => ({
  projectCovers: [
    [
      { x: 2, y: 9, w: 28, h: 1.3, z: 103, top: true },
      { x: 38, y: 27, w: 36, h: 1.4, z: 104, top: true },
      { x: 60, y: 5, w: 30, h: 1.3, z: 105, top: false },
    ],
    [
      { x: 40, y: 5, w: 30, h: 1.4, z: 103, top: true },
      { x: 10, y: 25, w: 35, h: 1.25, z: 104, top: true },
      { x: 53, y: 10, w: 30, h: 1.3, z: 102, top: false },
    ],
    [
      { x: 10, y: 4, w: 31, h: 1.4, z: 104, top: true },
      { x: 65, y: 18, w: 29, h: 1.4, z: 103, top: true },
      { x: 38, y: 15, w: 31, h: 1.3, z: 104, top: false },
    ],
    [
      { x: 5, y: 4, w: 38, h: 1.4, z: 103, top: true },
      { x: 35, y: 35, w: 30, h: 1.3, z: 104, top: true },
      { x: 55, y: 9, w: 32, h: 1.3, z: 103, top: false },
    ],
    [
      { x: 55, y: 4, w: 38, h: 1.4, z: 103, top: true },
      { x: 24, y: 34, w: 35, h: 1.3, z: 104, top: true },
      { x: 5, y: 5, w: 35, h: 1.3, z: 105, top: false },
    ],
    [
      { x: 40, y: 4, w: 25, h: 1.4, z: 103, top: true },
      { x: 65, y: 20, w: 35, h: 1.3, z: 104, top: true },
      { x: 13, y: 5, w: 28, h: 1.3, z: 104, top: false },
    ],
    [
      { x: 60, y: 3, w: 33, h: 1.4, z: 104, top: true },
      { x: 6, y: 18, w: 38, h: 1.4, z: 103, top: true },
      { x: 53, y: 6, w: 28, h: 1.4, z: 104, top: false },
    ],
    [
      { x: 4, y: 4, w: 23, h: 1.4, z: 104, top: true },
      { x: 20, y: 20, w: 32, h: 1.3, z: 105, top: true },
      { x: 47, y: 2, w: 31, h: 1.3, z: 104, top: false },
    ],
    [
      { x: 8, y: 5, w: 33, h: 1.3, z: 104, top: true },
      { x: 61, y: 20, w: 33, h: 1.4, z: 103, top: true },
      { x: 40, y: 2, w: 32, h: 1.35, z: 105, top: false },
    ],
    [
      { x: 58, y: 5, w: 34, h: 1.3, z: 104, top: true },
      { x: 4, y: 20, w: 33, h: 1.4, z: 105, top: true },
      { x: 38, y: 14, w: 30, h: 1.4, z: 104, top: false },
    ],
    [
      { x: 26, y: 9, w: 34, h: 1.3, z: 104, top: true },
      { x: 53, y: 20, w: 37, h: 1.4, z: 105, top: true },
      { x: 3, y: 4, w: 30, h: 1.3, z: 104, top: false },
    ],
    [
      { x: 30, y: 2, w: 35, h: 1.4, z: 104, top: true },
      { x: 57, y: 27, w: 34, h: 1.4, z: 105, top: true },
      { x: 2, y: 4, w: 30, h: 1.3, z: 103, top: false },
    ],
  ],
  setProjectCovers: (newVal: any) =>
    set((state) => ({ projectCovers: newVal })),
}));

export default useProjectCoversState;
