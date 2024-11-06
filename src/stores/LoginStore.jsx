import { create } from "zustand";

const useLoginStore = create((set) => ({
	usernameEmail: "",
	password: "",
	user_type: "",
	updateUsernameEmail: (usernameEmail) =>
		set(() => ({ usernameEmail: usernameEmail })),
	updatePassword: (password) => set(() => ({ password: password })),
	// count: 1,
	// inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default useLoginStore;
