import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useEditorStore = create(
  persist(
    (set) => ({
      data: null,
      updateData: (data) =>
        set((pre) => ({ ...pre, data: data })),
      deleteData: () => set((pre) => null),
    }),
    {
      name: "Editor-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useEditorStore;
