import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useProfileStore = create((set) => ({
  username: null,
  bio: null,
  avatar: null,
  socialMedias: {},
  setUsername: (username) => set((pre) => ({ ...pre, username: username })),
  setBio: (bio) => set((pre) => ({ ...pre, bio: bio })),
  setAvatar: (avatar) => set((pre) => ({ ...pre, avatar: avatar })),
  setAvatar: (socialMedias) =>
    set((pre) => ({ ...pre, socialMedias: socialMedias })),
}));

export default useProfileStore;
