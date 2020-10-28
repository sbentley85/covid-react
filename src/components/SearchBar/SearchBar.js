// imports
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

// Component imports
import SearchButton from "./SearchButton";
import SearchOption from "./SearchOption";
import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	searchRow: {
		display: "flex",
		justifyContent: "center",
	},
}));

const SearchBar = () => {
	const classes = useStyles();
	const [option, setOption] = React.useState("country");

	const handleChange = (event) => {
		console.log(event.target.value);
		setOption(event.target.value);
	};

	return (
		<Grid container>
			<Grid item xs={12} className={classes.searchRow}>
				<SearchOption option={option} handleChange={handleChange} />
				<SearchInput />
			</Grid>
			<Grid item xs={12} className={classes.searchRow}>
				<SearchButton />
			</Grid>
		</Grid>
	);
};

export default SearchBar;
