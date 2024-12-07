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
//   firstName: (firstName) => set((pre) => ({ ...pre, firstName: firstName })),
//   lastName: (lastName) => set((pre) => ({ ...pre, lastName: lastName })),
//   setUsername: (username) => set((pre) => ({ ...pre, username: username })),
//   setProfileId: (profileId) => set((pre) => ({ ...pre, profileId: profileId })),
//   setBio: (bio) => set((pre) => ({ ...pre, bio: bio })),
//   setAvatar: (avatar) => set((pre) => ({ ...pre, avatar: avatar })),
//   setHeader: (header) => set((pre) => ({ ...pre, header: header })),
// }));

const useProfileStore = create(
  persist(
    (set) => ({
      profileInfo: null,
      setProfileInfo: (profileInfo) =>
        set((pre) => ({ ...pre, profileInfo: profileInfo })),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useProfileStore;
