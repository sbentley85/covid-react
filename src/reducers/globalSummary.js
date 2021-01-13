const globalSummaryReducer = (state = null, action) => {
	if (action.type === "GLOBAL-SUMMARY") {
		return action.payload;
	}
	return state;
};

export default globalSummaryReducer;
