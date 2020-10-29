// imports
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

// Component imports
import SearchButton from "./SearchButton";
import SearchOption from "./SearchOption";
import SearchInput from "./SearchInput";

// import search option arrays from utils
import { authorities } from "../../utils/authorities";
import { regions } from "../../utils/regions";
import { countries } from "../../utils/countries";

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
	const [searchTerm, setSearchTerm] = React.useState("");
	const [optionList, setOptionList] = React.useState(countries);

	const optionChange = (event) => {
		const option = event.target.value;
		setOption(option);
		if (option === "country") setOptionList(countries);
		if (option === "region") setOptionList(regions);
		if (option === "authority") setOptionList(authorities);
		if (option === "postcode") setOptionList([]);
	};

	const termChange = (event, value) => {
		setSearchTerm(value);
	};

	const postcodeChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<Grid container>
			<Grid item xs={12} className={classes.searchRow}>
				<SearchOption option={option} handleChange={optionChange} />
				<SearchInput
					searchTerm={searchTerm}
					handleChange={termChange}
					postcodeChange={postcodeChange}
					optionList={optionList}
				/>
			</Grid>
			<Grid item xs={12} className={classes.searchRow}>
				<SearchButton />
			</Grid>
		</Grid>
	);
};

export default SearchBar;
