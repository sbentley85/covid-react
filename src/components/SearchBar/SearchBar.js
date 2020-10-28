// imports
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

// Component imports
import SearchButton from "./SearchButton";
import SearchOption from "./SearchOption";
import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const SearchBar = () => {
	const classes = useStyles();
	return (
		<FormControl className={classes.formControl}>
			<SearchOption />
			<SearchInput />
			<SearchButton />
		</FormControl>
	);
};

export default SearchBar;
