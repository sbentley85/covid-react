export const updateSearchTerm = (term) => {
	return {
		type: "SEARCH-TERM",
		payload: term,
	};
};
