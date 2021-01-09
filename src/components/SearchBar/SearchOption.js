import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

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
	return (
		<>
			<InputLabel className={classes.searchLabel} id="option-input-label">
				Search for
			</InputLabel>
			<Select
				labelId="option-input-label"
				id="option-input"
				value={props.searchOption}
				onChange={props.searchOptionChange}
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
