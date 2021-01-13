import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
	updateSearchTerm,
	updateSearchOption,
	updateTimelineData,
	updateOptionList,
} from "../../actions";

// import search option arrays from utils
import { authorities } from "../../utils/authorities";
import { regions } from "../../utils/regions";
import { countries } from "../../utils/countries";

const useStyles = makeStyles((theme) => ({
	searchOption: {
		margin: theme.spacing(1),
		width: "90%",
	},
	searchLabel: {
		marginLeft: theme.spacing(1),
	},
}));

const SearchOption = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const searchOption = useSelector((state) => state.searchOption);
	const searchOptionChange = (event) => {
		const option = event.target.value;
		dispatch(updateSearchTerm(""));
		dispatch(updateTimelineData(null));
		dispatch(updateSearchOption(option));
		if (option === "country") dispatch(updateOptionList(countries));
		if (option === "region") dispatch(updateOptionList(regions));
		if (option === "authority") dispatch(updateOptionList(authorities));
		if (option === "postcode") dispatch(updateOptionList([]));
	};

	return (
		<>
			<InputLabel className={classes.searchLabel} id="option-input-label">
				Search for
			</InputLabel>
			<Select
				labelId="option-input-label"
				id="option-input"
				value={searchOption}
				onChange={searchOptionChange}
				className={classes.searchOption}
			>
				<MenuItem value={"country"}>Country</MenuItem>
				<MenuItem value={"region"}>Region (UK only)</MenuItem>
				<MenuItem value={"authority"}>
					Local authority area (UK only)
				</MenuItem>
				<MenuItem value={"postcode"}>Postcode (UK Only)</MenuItem>
			</Select>
		</>
	);
};

export default SearchOption;
