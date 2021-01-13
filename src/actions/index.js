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

export const updateTimelineData = (data) => {
	return {
		type: "TIMELINE",
		payload: data,
	};
};

export const updateGlobalSummary = (data) => {
	return {
		type: "GLOBAL-SUMMARY",
		payload: data,
	};
};

export const updateCountrySummaries = (data) => {
	return {
		type: "COUNTRY-SUMMARIES",
		payload: data,
	};
};
