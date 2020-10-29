import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
	searchOption: {
		margin: theme.spacing(1),
	},
	searchLabel: {
		marginLeft: theme.spacing(1),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200,
	},
}));

const SearchOption = (props) => {
	const classes = useStyles();
	return (
		<FormControl className={classes.formControl}>
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
				<MenuItem value={"authority"}>Local authority area</MenuItem>
				<MenuItem value={"postcode"}>Postcode (UK Only)</MenuItem>
			</Select>
		</FormControl>
	);
};

export default SearchOption;
