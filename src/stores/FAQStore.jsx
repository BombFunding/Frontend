import { create } from "zustand";

const useFAQStore = create((set) => ({
	toggleIndex: null,
	setToggleIndex: (toggleIndex) =>
		set((pre) => ({ ...pre, toggleIndex: toggleIndex })),
}));

export { useFAQStore };
