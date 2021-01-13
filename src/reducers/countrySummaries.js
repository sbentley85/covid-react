const countrySummariesReducer = (state = null, action) => {
	if (action.type === "COUNTRY-SUMMARIES") {
		return action.payload;
	}
	return state;
};

export default countrySummariesReducer;
