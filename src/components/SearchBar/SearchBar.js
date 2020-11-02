// imports
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// Component imports
import SearchButton from "./SearchButton";
import SearchOption from "./SearchOption";
import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
	searchInputRow: {
		justifyContent: "center",
		margin: theme.spacing(2),
		marginTop: "4rem",
	},
	searchButtonRow: {
		justifyContent: "center",
		margin: theme.spacing(2),
		marginBottom: "3rem",
	},
}));

const SearchBar = (props) => {
	const classes = useStyles();

	return (
		<>
			<Grid item container className={classes.searchInputRow}>
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
			<Grid item container className={classes.searchButtonRow}>
				<Grid item>
					<SearchButton handleSearch={props.handleSearch} />
				</Grid>
			</Grid>
		</>
	);
};

export default SearchBar;
