import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
	graphOption: {
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

const GraphOption = (props) => {
	const classes = useStyles();
	return (
		<FormControl className={classes.formControl}>
			<InputLabel className={classes.searchLabel} id="option-input-label">
				Show
			</InputLabel>
			<Select
				labelId="option-input-label"
				id="option-input"
				value={props.graphOption}
				onChange={props.graphOptionChange}
				className={classes.graphOption}
			>
				<MenuItem value={"Confirmed"}>Confirmed</MenuItem>
				<MenuItem value={"Deaths"}>Deaths</MenuItem>
			</Select>
		</FormControl>
	);
};

export default GraphOption;
