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

	const renderOptions = () => {
		if (
			props.searchOption === "authority" ||
			props.searchOption === "postcode"
		) {
			return <MenuItem value={"Confirmed"}>Confirmed</MenuItem>;
		}
		return [
			<MenuItem value={"Confirmed"}>Confirmed</MenuItem>,
			<MenuItem value={"Deaths"}>Deaths</MenuItem>,
		];
	};

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
				{renderOptions()}
			</Select>
		</FormControl>
	);
};

export default GraphOption;
