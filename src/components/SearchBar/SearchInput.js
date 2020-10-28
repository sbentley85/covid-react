import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	textField: {
		margin: theme.spacing(1),
		minWidth: 200,
	},
}));

const SearchInput = () => {
	const classes = useStyles();
	return (
		<>
			<TextField
				className={classes.textField}
				id="search"
				label="Location"
			/>
		</>
	);
};

export default SearchInput;
