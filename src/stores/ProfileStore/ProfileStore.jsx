import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// const useProfileStore = create((set) => ({
//   firstName: null,
//   lastName: null,
//   username: null,
//   profileId: null,
//   bio: null,
//   avatar: null,
//   header: null,
//   socialMedias: {},
//   setFirstName: (firstName) => set((pre) => ({ ...pre, firstName: firstName })),
//   setLastName: (lastName) => set((pre) => ({ ...pre, lastName: lastName })),
//   setUsername: (username) => set((pre) => ({ ...pre, username: username })),
//   setProfileId: (profileId) => set((pre) => ({ ...pre, profileId: profileId })),
//   setBio: (bio) => set((pre) => ({ ...pre, bio: bio })),
//   setAvatar: (avatar) => set((pre) => ({ ...pre, avatar: avatar })),
//   setHeader: (header) => set((pre) => ({ ...pre, header: header })),
// }));

const useProfileStore = create(
	persist(
		(set) => ({
			profileId: null,
			fullname: null,
			username: null,
			bio: null,
			avatar: null,
			header: null,
			likeCount: 0,
			positions: [],
			socialMedias: {},
			balance: 0,
			setProfileId: (profileId) =>
				set((pre) => ({ ...pre, profileId: profileId })),
			setFullname: (fullname) =>
				set((pre) => ({ ...pre, fullname: fullname })),
			setUsername: (username) =>
				set((pre) => ({ ...pre, username: username })),
			setBio: (bio) => set((pre) => ({ ...pre, bio: bio })),
			setAvatar: (avatar) => set((pre) => ({ ...pre, avatar: avatar })),
			setHeader: (header) => set((pre) => ({ ...pre, header: header })),
			setLikeCount: (count) =>
				set((pre) => ({ ...pre, likeCount: count })),
			setPositions: (positions) =>
				set((pre) => ({ ...pre, positions: positions })),
			profileInfo: null,
			setProfileInfo: (profileInfo) =>
				set((pre) => ({ ...pre, profileInfo: profileInfo })),
			setBalance: (balance) =>
				set((pre) => ({ ...pre, balance: balance })),
		}),
		{
			name: "profile-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useProfileStore;
