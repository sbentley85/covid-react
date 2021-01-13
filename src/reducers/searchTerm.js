const searchTermReducer = (state = null, action) => {
	if (action.type === "SEARCH-TERM") {
		return action.payload;
	}
	return state;
};

export default searchTermReducer;
