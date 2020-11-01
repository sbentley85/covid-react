// imports
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

// Component imports
import SearchButton from "./SearchButton";
import SearchOption from "./SearchOption";
import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
	searchRow: {
		justifyContent: "space-around",
		margin: theme.spacing(2),
	},
}));

const SearchBar = (props) => {
	const classes = useStyles();

	return (
		<>
			<Grid item container className={classes.searchRow}>
				<Grid item xs={10} sm={5} md={3}>
					<SearchOption
						searchOption={props.searchOption}
						searchOptionChange={props.searchOptionChange}
					/>
				</Grid>
				<Grid item xs={10} sm={5} md={3}>
					<SearchInput
						searchTerm={props.searchTerm}
						handleChange={props.termChange}
						postcodeChange={props.postcodeChange}
						optionList={props.optionList}
					/>
				</Grid>
			</Grid>
			<Grid item container className={classes.searchRow}>
				<Grid item>
					<SearchButton handleSearch={props.handleSearch} />
				</Grid>
			</Grid>
		</>
	);
};

export default SearchBar;
