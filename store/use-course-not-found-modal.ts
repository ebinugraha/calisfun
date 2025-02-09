import { create } from 'zustand'

type CourseNotFoundState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


export const useCourseNotFoundModal = create<CourseNotFoundState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}))