import { create } from "zustand"

interface RepositoryModalState {
  isRepositoryOpen: boolean
  openRepository: () => void
  closeRepository: () => void
}

export const useRepositoryModal = create<RepositoryModalState>((set) => ({
  isRepositoryOpen: false,
  openRepository: () => set({ isRepositoryOpen: true }),
  closeRepository: () => set({ isRepositoryOpen: false }),
}))
