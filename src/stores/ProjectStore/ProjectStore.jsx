import { getData } from "@/Services/ApiClient/Services";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useProjectStore = create(
	persist(
		(set) => ({
			loading: false,
			error: null,
			projectId: null,
			user: null,
			username: null,
			page: null,
			projectName: null,
			image: null,
			subCategories: [],
			description: null,
			creationDate: null,
			positionIds: [],
			setProjectId: (val) => set((pre) => ({ ...pre, projectId: val })),
			setUser: (val) => set((pre) => ({ ...pre, user: val })),
			setUsername: (val) => set((pre) => ({ ...pre, username: val })),
			setPage: (val) => set((pre) => ({ ...pre, page: val })),
			setProjectName: (val) =>
				set((pre) => ({ ...pre, projectName: val })),
			setImage: (val) => set((pre) => ({ ...pre, image: val })),
			setSubCategories: (val) =>
				set((pre) => ({ ...pre, subCategories: val })),
			setDescription: (val) =>
				set((pre) => ({ ...pre, description: val })),
			setCreationDate: (val) =>
				set((pre) => ({ ...pre, creationDate: val })),
			setPositionIds: (val) =>
				set((pre) => ({ ...pre, positionIds: val })),
			setError: (val) => set((pre) => ({ ...pre, error: val })),
			setLoading: (val) => set((pre) => ({ ...pre, loading: val })),
			updateProject: async (projectId) => {
				try {
					const data = await getData(`/projects/${projectId}`);
					console.log(data)
					set((pre) => ({
						projectId: data.id,
						user: data.user,
						username: data.username,
						page: data.page,
						projectName: data.name,
						image: data.image,
						subCategories: data.subcategories,
						description: data.description,
						creationDate: data.creation_date,
						positionIds: data.position_ids,
						error: null,
						loading: false,
					}));
				} catch (err) {
					set((pre) => ({ ...pre, error: 403, loading: false }));
				}
			},
			logout: () =>
				set({
					projectId: null,
					user: null,
					username: null,
					page: null,
					projectName: null,
					image: null,
					subCategories: [],
					description: null,
					creationDate: null,
					positionIds: [],
					error: null,
				}),
		}),
		{
			name: "project-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useProjectStore;
