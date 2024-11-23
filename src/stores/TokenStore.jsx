import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useTokenStore = create(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			updateAccessToken: (token) =>
				set((pre) => ({ ...pre, accessToken: token })),
			updateRefreshToken: (token) =>
				set((pre) => ({ ...pre, refreshToken: token })),
			deleteToken: () => set((pre) => null),
		}),
		{
			name: "Token-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

export default useTokenStore;
