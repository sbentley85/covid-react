import { combineReducers } from "redux";
import searchTermReducer from "./searchTerm";

const allReducers = combineReducers({
	searchTerm: searchTermReducer,
});

export default allReducers;
