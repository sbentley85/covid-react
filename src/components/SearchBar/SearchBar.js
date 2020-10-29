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

const SearchBar = (props) => {
	const classes = useStyles();

	return (
		<Grid container>
			<Grid item xs={12} className={classes.searchRow}>
				<SearchOption
					searchOption={props.searchOption}
					searchOptionChange={props.searchOptionChange}
				/>
				<SearchInput
					searchTerm={props.searchTerm}
					handleChange={props.termChange}
					postcodeChange={props.postcodeChange}
					optionList={props.optionList}
				/>
			</Grid>
			<Grid item xs={12} className={classes.searchRow}>
				<SearchButton />
			</Grid>
		</Grid>
	);
};

export default SearchBar;
