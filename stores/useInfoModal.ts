import { create } from "zustand";

interface InfoModalState {
  isInfoOpen: boolean;
  openInfo: () => void;
  closeInfo: () => void;
}

export const useInfoModal = create<InfoModalState>((set) => ({
  isInfoOpen: false,
  openInfo: () => set({ isInfoOpen: true }),
  closeInfo: () => set({ isInfoOpen: false }),
}));
