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
	const [type, setType] = React.useState("");
	const classes = useStyles();
	return (
		<FormControl className={classes.formControl}>
			<InputLabel
				className={classes.searchLabel}
				id="demo-simple-select-label"
			>
				Search for
			</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={props.option}
				onChange={props.handleChange}
				className={classes.searchOption}
			>
				<MenuItem value={"country"}>Country</MenuItem>
				<MenuItem value={"region"}>Region (UK only)</MenuItem>
				<MenuItem value={"postcode"}>Postcode (UK Only)</MenuItem>
			</Select>
		</FormControl>
	);
};

export default SearchOption;
