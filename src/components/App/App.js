import "./App.css";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
	postcodeLookup,
	formatUKData,
	formatCountryData,
	getCountryCode,
} from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchTerm, updateTimelineData } from "../../actions";

// Component imports
import SearchBar from "../SearchBar/SearchBar";
import Summary from "../Results/Summary";
import Graph from "../Results/Graph";
import Attribution from "../attribution";

const useStyles = makeStyles({
	appContainer: {
		display: "flex",
		justifyContent: "center",
	},
});

function App() {
	const classes = useStyles();
	const dispatch = useDispatch();
	// Redux store variables
	const searchTerm = useSelector((state) => state.searchTerm);
	const searchOption = useSelector((state) => state.searchOption);
	const timelineData = useSelector((state) => state.timelineData);

	const handleSearch = async () => {
		if (searchOption === "country") countrySearch();
		if (searchOption === "region") regionSearch();
		if (searchOption === "authority") authoritySearch();
		if (searchOption === "postcode") postcodeSearch();
	};

	const countrySearch = async () => {
		const countryCode = await getCountryCode(searchTerm);
		const url = `https://corona-api.com/countries/${countryCode}`;

		try {
			const response = await fetch(url);
			if (response.ok) {
				const jsonResponse = await response.json();

				const formattedData = formatCountryData(jsonResponse.data);
				dispatch(updateTimelineData(formattedData));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const regionSearch = async () => {
		const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=region;areaName=${searchTerm}&structure={"date":"date","areaName":"areaName","dailyCases":"newCasesBySpecimenDate","cumCases":"cumCasesBySpecimenDate","newDeaths":"newDeaths28DaysByDeathDate","cumDeaths":"cumDeaths28DaysByDeathDate"}`;
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const jsonResponse = await response.json();
				const formattedData = formatUKData(jsonResponse.data);
				dispatch(updateTimelineData(formattedData));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const authoritySearch = async (authority) => {
		const authorityToSearch = authority ? authority : searchTerm;
		const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${authorityToSearch}&structure={"date":"date","areaName":"areaName","dailyCases":"newCasesBySpecimenDate","cumCases":"cumCasesBySpecimenDate","newDeaths":"newDeaths28DaysByDeathDate","cumDeaths":"cumDeaths28DaysByDeathDate"}`;
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const jsonResponse = await response.json();
				const formattedData = formatUKData(jsonResponse.data);
				dispatch(updateTimelineData(formattedData));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const postcodeSearch = async () => {
		const authority = await postcodeLookup(searchTerm);
		dispatch(updateSearchTerm(authority));
		authoritySearch(authority);
	};

	return (
		<div className="App">
			<Grid container className={classes.appContainer}>
				<SearchBar handleSearch={handleSearch} />

				<Summary />
				{timelineData ? <Graph /> : null}
				<Attribution />
			</Grid>
		</div>
	);
}

export default App;
