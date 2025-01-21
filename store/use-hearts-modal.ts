import { create } from 'zustand'

type ExitHeartsState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


export const useHeartsModal = create<ExitHeartsState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}))