import { countries } from "../utils/countries";

const optionListReducer = (state = countries, action) => {
	if (action.type === "OPTION-LIST") {
		return action.payload;
	}
	return state;
};

export default optionListReducer;
