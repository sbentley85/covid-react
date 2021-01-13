export const updateSearchTerm = (term) => {
	return {
		type: "SEARCH-TERM",
		payload: term,
	};
};

export const updateSearchOption = (option) => {
	return {
		type: "SEARCH-OPTION",
		payload: option,
	};
};
