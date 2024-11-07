import { create } from "zustand";

const useLoginFormStore = create((set) => ({
	usernameEmail: "",
	password: "",
	updateUsernameEmail: (usernameEmail) =>
		set((pre) => ({ ...pre, usernameEmail: usernameEmail })),
	updatePassword: (password) =>
		set((pre) => ({ ...pre, password: password })),
}));
const useSignupFormStore = create((set) => ({
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	user_type: "",
	updateUsername: (username) =>
		set((pre) => ({ ...pre, username: username })),
	updatePassword: (password) =>
		set((pre) => ({ ...pre, password: password })),
	updateConfirmPassword: (confirmPassword) =>
		set((pre) => ({ ...pre, confirmPassword: confirmPassword })),
	updateEmail: (email) => set((pre) => ({ ...pre, email: email })),
	updateUsertype: (user_type) =>
		set((pre) => ({ ...pre, user_type: user_type })),
}));

export { useLoginFormStore, useSignupFormStore };
