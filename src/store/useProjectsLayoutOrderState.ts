import { create } from "zustand";

type StateType = {
  projectsLayoutOrder: number[];
};

const useProjectsLayoutOrderState = create<StateType>(() => {
  const createCoverArray = (length: number, numLayouts: number): number[] => {
    let previous = -1;
    const array = Array.from({ length }, () => {
      let next;
      do {
        next = Math.floor(Math.random() * numLayouts);
      } while (next === previous);
      previous = next;
      return next;
    });

    // Ensure the first and last elements are different
    if (array.length > 1 && array[0] === array[array.length - 1]) {
      let replacement;
      do {
        replacement = Math.floor(Math.random() * numLayouts);
      } while (
        replacement === array[array.length - 2] ||
        replacement === array[0]
      );
      array[array.length - 1] = replacement;
    }

    return array;
  };

  const coversLength = 100
  const layoutsAvailable = 12;

  return {
    projectsLayoutOrder: createCoverArray(coversLength, layoutsAvailable)
  };
});

export default useProjectsLayoutOrderState;