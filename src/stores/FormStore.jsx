import { create } from "zustand";

const useFormStore = create((set) => ({
    
	usernameEmail: "",
	password: "",
	user_type: "",
	updateUsernameEmail: (usernameEmail) =>
		set(() => ({ usernameEmail: usernameEmail })),
	updatePassword: (password) => set(() => ({ password: password })),
}));

export default useFormStore;
