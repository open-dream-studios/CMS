import { create } from 'zustand';

type IncomingImageStyle = {
  width: string;
  marginLeft: string;
  marginTop: string;
};

type IncomingImageStylesState = {
  incomingImageStyles: IncomingImageStyle[];
  setIncomingImageStyles: (styles: IncomingImageStyle[]) => void;
};

const useIncomingImageStylesStore = create<IncomingImageStylesState>((set) => ({
  incomingImageStyles: [],
  setIncomingImageStyles: (styles) => set({ incomingImageStyles: styles }),
}));

export default useIncomingImageStylesStore;