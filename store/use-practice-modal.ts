import { create } from 'zustand'

type ExitPracticesState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


export const usePracticeModal = create<ExitPracticesState>((set) => ({
    isOpen: true,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}))