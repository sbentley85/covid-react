import { combineReducers } from "redux";
import searchTermReducer from "./searchTerm";
import searchOptionReducer from "./searchOption";

const allReducers = combineReducers({
	searchTerm: searchTermReducer,
	searchOption: searchOptionReducer,
});

export default allReducers;
