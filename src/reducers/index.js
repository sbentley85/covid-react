import { combineReducers } from "redux";
import searchTermReducer from "./searchTerm";
import searchOptionReducer from "./searchOption";
import timelineReducer from "./timeline";
import globalSummaryReducer from "./globalSummary";
import countrySummariesReducer from "./countrySummaries";

const allReducers = combineReducers({
	searchTerm: searchTermReducer,
	searchOption: searchOptionReducer,
	timelineData: timelineReducer,
	globalSummaryData: globalSummaryReducer,
	countrySummariesData: countrySummariesReducer,
});

export default allReducers;
