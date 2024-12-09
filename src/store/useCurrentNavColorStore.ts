import { create } from "zustand";

type StateType = {
  currentNavColor: string;
  setCurrentNavColor: (newVal: string) => void;
};

const useCurrentNavColorState = create<StateType>((set) => ({
  currentNavColor: "black",
  setCurrentNavColor: (newVal: string) =>
    set((state) => ({ currentNavColor: newVal })),
}));

export default useCurrentNavColorState;

// import { create } from "zustand";

// type NavStateType = {
//   currentNavColor: string;
//   setCurrentNavColor: (color: string) => void;
//   setNavColorWithDelay: (color: string, delay: number) => void;
// };

// const useCurrentNavColorState = create<NavStateType>((set) => ({
//   currentNavColor: "black",
//   setCurrentNavColor: (color) => set(() => ({ currentNavColor: color })),
//   setNavColorWithDelay: (color, delay) => {
//     setTimeout(() => {
//       set(() => ({ currentNavColor: color }));
//     }, delay);
//   },
// }));

// export default useCurrentNavColorState;