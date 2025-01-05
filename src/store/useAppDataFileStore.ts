import { create } from "zustand";

export type Project = {
  id: string;
  index: number;
  title: string;
  description: string;
  bg_color: string;
  text_color: string;
  home_page: boolean;
};

export type Archive = {
  id: string;
  index: number;
  title: string;
  bg_color: string;
};

export type Pages = {
  projects: Project[];
  archives: Archive[];
};

export type AppDataFile = {
  pages: Pages;
};

type StateType = {
  appDataFile: AppDataFile | null; // The state can start as `null` before the file is loaded
  setAppDataFile: (newVal: AppDataFile) => void;
};

const useAppDataFileStore = create<StateType>((set) => ({
  appDataFile: null, 
  setAppDataFile: (newVal: AppDataFile) =>
    set(() => ({ appDataFile: newVal })),
}));

export default useAppDataFileStore;