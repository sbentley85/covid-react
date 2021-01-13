import { combineReducers } from "redux";
import searchTermReducer from "./searchTerm";
import searchOptionReducer from "./searchOption";
import timelineReducer from './timeline'

const allReducers = combineReducers({
	searchTerm: searchTermReducer,
	searchOption: searchOptionReducer,
	timelineData: timelineReducer
});

export default allReducers;
