import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";


const useStyles = makeStyles((theme) => ({
	textField: {
		margin: theme.spacing(1),
		width: "90%",
	},
}));

const SearchInput = (props) => {
	
	const classes = useStyles();
	return props.optionList.length === 0 ? (
		<TextField
			label="Location"
			onChange={props.postcodeChange}
			className={classes.textField}
			id="search"
		/>
	) : (
		<Autocomplete
			id="search"
			options={props.optionList}
			getOptionLabel={(option) => option}
			onChange={props.handleChange}
			value={props.searchTerm}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Location"
					className={classes.textField}
				/>
			)}
		/>
	);
};

export default SearchInput;
