import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const findParent = (subcategory) => {
	const parents = [
		{
			value: "هوش مصنوعی",
			label: "هوش مصنوعی",
			parent: "تکنولوژی",
		},
		{
			value: "اینترنت اشیا",
			label: "اینترنت اشیا",
			parent: "تکنولوژی",
		},
		{ value: "نرم‌افزار", label: "نرم‌افزار", parent: "تکنولوژی" },
		{ value: "امنیت", label: "امنیت", parent: "تکنولوژی" },
		{
			value: "واقعیت افزوده",
			label: "واقعیت افزوده",
			parent: "تکنولوژی",
		},
		{ value: "موسیقی", label: "موسیقی", parent: "هنری" },
		{ value: "سینما", label: "سینما", parent: "هنری" },
		{ value: "صنایع دستی", label: "صنایع دستی", parent: "هنری" },
		{ value: "تغذیه", label: "تغذیه", parent: "سلامت" },
		{ value: "روان‌شناسی", label: "روان‌شناسی", parent: "سلامت" },
		{ value: "درمان", label: "درمان", parent: "سلامت" },
		{ value: "فرهنگی", label: "فرهنگی", parent: "گردشگری" },
		{ value: "شهری", label: "شهری", parent: "گردشگری" },
		{ value: "بین‌المللی", label: "بین‌المللی", parent: "گردشگری" },
		{
			value: "کتب و نشریات",
			label: "کتب و نشریات",
			parent: "آموزش",
		},
		{ value: "توسعه فردی", label: "توسعه فردی", parent: "آموزش" },
		{
			value: "مؤسسات آموزشی",
			label: "مؤسسات آموزشی",
			parent: "آموزش",
		},
		{
			value: "سرمایه‌گذاری",
			label: "سرمایه‌گذاری",
			parent: "مالی",
		},
		{ value: "رمزارز", label: "رمزارز", parent: "مالی" },
		{ value: "بیمه", label: "بیمه", parent: "مالی" },
	];
	return parents.find((category) => category.value === subcategory).parent;
};

const useStarboardStore = create(
	persist(
		(set) => ({
			pages: [-3, -2, -1, 0, 1, 2, 3],

			persianToEnglishMain: {
				تکنولوژی: "Technology",
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
					sorting: "most-recent", //most-recent top-liked top-visited
					results: "0",
					totalPages: 0,
				}));
			},
			pageNumber: 1,
			searchQuery: "",
			loading: true,
			projects: [],
			resultsPerPage: "6",
			mainCategory: "",
			subcategory: "",
			sorting: "most-recent", //most-recent top-liked top-visited
			results: "0",
			totalPages: 0,
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
				set((pre) => ({ ...pre, subcategory: subcategory, mainCategory: findParent(subcategory) })),
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
