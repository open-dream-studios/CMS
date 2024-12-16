import { create } from "zustand";
import { FileOrFolder } from "../App2";

type StateType = {
  googleDrive: FileOrFolder | null;  
  setGoogleDrive: (newVal: FileOrFolder | null) => void;
};

const useGoogleDriveStore = create<StateType>((set) => ({
  googleDrive: null,  
  setGoogleDrive: (newVal: FileOrFolder | null) =>
    set(() => ({ googleDrive: newVal })),
}));

export default useGoogleDriveStore;