import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStarboardStore = create(
	persist(
		(set) => ({
			pageNumber: 1,
			searchQuery: "",
			loading: true,
			projects: [],
			resultsPerPage: "6",
			mainCategory: "",
			subcategory: "",
			sorting: "most-recent",
			results: "0",
			totalPages: 0,
			// most-recent
			// top-liked
			// top-visited
			pages: [-3, -2, -1, 0, 1, 2, 3],
			persianToEnglishMain: {
				"تکنولوژی": "Technology",
				گردشگری: "Tourism",
				آموزش: "Education",
				مالی: "Finance",
				هنری: "Art",
				سلامت: "Wellness",
			},
			persianToEnglish: {
				"هوش مصنوعی": "Artificial Intelligence",
				"اینترنت اشیا": "Internet of Things",
				نرم‌افزار: "Software",
				امنیت: "Security",
				"واقعیت افزوده": "Augmented Reality",
				موسیقی: "Music",
				سینما: "Cinema",
				"صنایع دستی": "Handicrafts",
				تغذیه: "Nutrition",
				روان‌شناسی: "Psychology",
				درمان: "Therapy",
				فرهنگی: "Cultural",
				شهری: "Urban",
				بین‌المللی: "International",
				"کتب و نشریات": "Books and Publications",
				"توسعه فردی": "Personal Development",
				"مؤسسات آموزشی": "Educational Institutions",
				سرمایه‌گذاری: "Investment Fund",
				رمزارز: "Cryptocurrency",
				بیمه: "Insurance",
			},

			englishToPersian: {
				"Artificial Intelligence": "هوش مصنوعی",
				"Internet of Things": "اینترنت اشیا",
				Software: "نرم‌افزار",
				Security: "امنیت",
				"Augmented Reality": "واقعیت افزوده",
				Music: "موسیقی",
				Cinema: "سینما",
				Handicrafts: "صنایع دستی",
				Nutrition: "تغذیه",
				Psychology: "روان‌شناسی",
				Therapy: "درمان",
				Cultural: "فرهنگی",
				Urban: "شهری",
				International: "بین‌المللی",
				"Books and Publications": "کتب و نشریات",
				"Personal Development": "توسعه فردی",
				"Educational Institutions": "مؤسسات آموزشی",
				"Investment Fund": "سرمایه‌گذاری",
				Cryptocurrency: "رمزارز",
				Insurance: "بیمه",
			},
			reset: () => {
				set((pre) => ({
					...pre,
					pageNumber: 1,
					searchQuery: "",
					loading: true,
					projects: [],
					resultsPerPage: "6",
					mainCategory: "",
					subcategory: "",
					sorting: "most-recent",
				}));
			},
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
			setMainCategory: (mainCategory) =>
				set((pre) => ({
					...pre,
					mainCategory: mainCategory,
					subcategory: "",
				})),
			setSubcategory: (subcategory) =>
				set((pre) => ({ ...pre, subcategory: subcategory })),
			setSorting: (sorting) =>
				set((pre) => ({ ...pre, sorting: sorting })),
			setResults: (results) =>
				set((pre) => ({ ...pre, results: results })),
			setTotalPages: (totalPages) =>
				set((pre) => ({ ...pre, totalPages: totalPages })),
			update: () => {},
		}),
		{
			name: "profile-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useStarboardStore;
