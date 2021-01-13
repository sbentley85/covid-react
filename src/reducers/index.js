import { combineReducers } from "redux";
import searchTermReducer from "./searchTerm";
import searchOptionReducer from "./searchOption";
import timelineReducer from "./timeline";
import globalSummaryReducer from "./globalSummary";
import countrySummariesReducer from "./countrySummaries";
import optionListReducer from "./optionList";

const allReducers = combineReducers({
	searchTerm: searchTermReducer,
	searchOption: searchOptionReducer,
	timelineData: timelineReducer,
	globalSummaryData: globalSummaryReducer,
	countrySummariesData: countrySummariesReducer,
	optionList: optionListReducer,
});

export default allReducers;
