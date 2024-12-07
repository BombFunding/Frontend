import { create } from "zustand";

const useProfileStore = create((set) => ({
	profileId: null,
	fullname: null,
	username: null,
	bio: null,
	avatar: null,
	header: null,
	likeCount: 0,
	positions: [],
	socialMedias: {},
	setProfileId: (profileId) =>
		set((pre) => ({ ...pre, profileId: profileId })),
	setFullname: (fullname) => set((pre) => ({ ...pre, fullname: fullname })),
	setUsername: (username) => set((pre) => ({ ...pre, username: username })),
	setBio: (bio) => set((pre) => ({ ...pre, bio: bio })),
	setAvatar: (avatar) => set((pre) => ({ ...pre, avatar: avatar })),
	setHeader: (header) => set((pre) => ({ ...pre, header: header })),
	setLikeCount: (count) => set((pre) => ({ ...pre, likeCount: count })),
	setPositions: (positions) =>
		set((pre) => ({ ...pre, positions: positions })),
}));

export default useProfileStore;
