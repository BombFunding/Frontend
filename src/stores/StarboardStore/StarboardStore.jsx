import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStarboardStore = create(
	persist(
		(set) => ({
			pageNumber: 1,
			searchQuery: "",
			loading: true,
			projects: [],
			resultsPerPage: 6,
			pages: [-3, -2, -1, 0, 1, 2, 3],
			setPageNumber: (pageNumber) => {
				pageNumber
					? set((pre) => ({ ...pre, pageNumber: pageNumber }))
					: set((pre) => ({ ...pre, pageNumber: 1 }));
			},
			setSearchQuery: (searchQuery) =>
				set((pre) => ({ ...pre, searchQuery: searchQuery })),
			setLoading: (loading) =>
				set((pre) => ({ ...pre, loading: loading })),
			setProjects: (projects) =>
				set((pre) => ({ ...pre, projects: projects })),
			setResultsPerPage: (resultsPerPage) =>
				set((pre) => ({ ...pre, resultsPerPage: resultsPerPage })),
		}),
		{
			name: "profile-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useStarboardStore;
