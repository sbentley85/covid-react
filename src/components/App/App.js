import "./App.css";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
	postcodeLookup,
	formatUKData,
	formatCountryData,
	getCountryCode,
} from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
	updateSearchTerm,
	updateSearchOption,
	updateTimelineData,
} from "../../actions";

// Component imports
import SearchBar from "../SearchBar/SearchBar";
import Summary from "../Results/Summary";
import Graph from "../Results/Graph";
import Attribution from "../attribution";

// import search option arrays from utils
import { authorities } from "../../utils/authorities";
import { regions } from "../../utils/regions";
import { countries } from "../../utils/countries";

const useStyles = makeStyles({
	appContainer: {
		display: "flex",
		justifyContent: "center",
	},
});

function App() {
	const classes = useStyles();
	const dispatch = useDispatch();
	// Reduc store variables
	const searchTerm = useSelector((state) => state.searchTerm);
	const searchOption = useSelector((state) => state.searchOption);
	const timelineData = useSelector((state) => state.timelineData);

	// state variables
	const [optionList, setOptionList] = useState(countries);
	// const [data, setData] = useState(null);

	const termChange = (event, value) => {
		dispatch(updateSearchTerm(value));
		dispatch(updateTimelineData(null));
		// setData(null);
	};

	const postcodeChange = (event) => {
		dispatch(updateSearchTerm(event.target.value));
	};

	const searchOptionChange = (event) => {
		const option = event.target.value;
		dispatch(updateSearchTerm(""));
		dispatch(updateTimelineData(null));
		dispatch(updateSearchOption(option));

		if (option === "country") setOptionList(countries);
		if (option === "region") setOptionList(regions);
		if (option === "authority") setOptionList(authorities);
		if (option === "postcode") setOptionList([]);
	};

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
				<SearchBar
					searchOption={searchOption}
					searchOptionChange={searchOptionChange}
					searchTerm={searchTerm}
					termChange={termChange}
					postcodeChange={postcodeChange}
					optionList={optionList}
					handleSearch={handleSearch}
				/>

				<Summary
					searchOption={searchOption}
					searchTerm={searchTerm}
					regionData={
						timelineData
							? timelineData[timelineData.length - 1]
							: null
					}
				/>
				{timelineData ? (
					<Graph data={timelineData} searchOption={searchOption} />
				) : null}
				<Attribution />
			</Grid>
		</div>
	);
}

export default App;
