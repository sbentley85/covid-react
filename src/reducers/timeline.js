const timelineReducer = (state = null, action) => {
	if (action.type === "TIMELINE") {
		return action.payload;
	}
	return state;
};

export default timelineReducer;
