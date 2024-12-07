import { create } from "zustand";

const useProfileStore = create((set) => ({
	fullname: null,
	username: null,
	bio: null,
	avatar: null,
	header: null,
	likeCount: 0,
	socialMedias: {},
	setFullname: (fullname) => set((pre) => ({ ...pre, fullname: fullname })),
	setUsername: (username) => set((pre) => ({ ...pre, username: username })),
	setBio: (bio) => set((pre) => ({ ...pre, bio: bio })),
	setAvatar: (avatar) => set((pre) => ({ ...pre, avatar: avatar })),
	setHeader: (header) => set((pre) => ({ ...pre, header: header })),
	setLikeCount: (count) => set((pre) => ({ ...pre, likeCount: count })),
}));

export default useProfileStore;
