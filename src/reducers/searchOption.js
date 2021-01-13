const searchOptionReducer = (state = "country", action) => {
	if (action.type === "SEARCH-OPTION") {
		return action.payload;
	}
	return state;
};

export default searchOptionReducer;
