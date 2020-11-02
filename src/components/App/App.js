import "./App.css";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { formatRegionData } from "../../utils/utils";

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
	// state variables
	const [searchOption, setSearchOption] = useState("country");
	const [searchTerm, setSearchTerm] = useState("");
	const [optionList, setOptionList] = useState(countries);
	const [data, setData] = useState(null);

	const termChange = (event, value) => {
		setSearchTerm(value);
		setData(null);
	};

	const postcodeChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const searchOptionChange = (event) => {
		const option = event.target.value;
		setSearchTerm("");
		setData(null);
		setSearchOption(option);
		if (option === "country") setOptionList(countries);
		if (option === "region") setOptionList(regions);
		if (option === "authority") setOptionList(authorities);
		if (option === "postcode") setOptionList([]);
	};

	const handleSearch = async () => {
		console.log(searchTerm, searchOption);
		if (searchOption === "country") countrySearch();
		if (searchOption === "region") regionSearch();
		if (searchOption === "authority") authoritySearch();
		if (searchOption === "postcode") postcodeSearch();
	};

	const countrySearch = async () => {
		console.log("searching for a country");
		const url = `https://api.covid19api.com/total/dayone/country/${searchTerm}`;
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const jsonResponse = await response.json();
				setData(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const regionSearch = async () => {
		console.log("searching for a region");
		const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=region;areaName=${searchTerm}&structure={"date":"date","areaName":"areaName","dailyCases":"newCasesBySpecimenDate","cumCases":"cumCasesBySpecimenDate","newDeaths":"newDeaths28DaysByDeathDate","cumDeaths":"cumDeaths28DaysByDeathDate"}`;
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const jsonResponse = await response.json();

				const formattedData = formatRegionData(jsonResponse.data);

				setData(formattedData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const authoritySearch = async (authority) => {
		console.log("searching for an authority");

		const authorityToSearch = authority ? authority : searchTerm;
		console.log(authorityToSearch);
		const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${authorityToSearch}&structure={"date":"date","areaName":"areaName","dailyCases":"newCasesBySpecimenDate","cumCases":"cumCasesBySpecimenDate","newDeaths":"newDeaths28DaysByDeathDate","cumDeaths":"cumDeaths28DaysByDeathDate"}`;
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const jsonResponse = await response.json();
				const formattedData = formatRegionData(jsonResponse.data);
				setData(formattedData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const postcodeLookup = async () => {
		const url = `https://api.coronavirus.data.gov.uk/v1/code?category=postcode&search=${searchTerm}`;

		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const jsonResponse = await response.json();

				console.log(jsonResponse);
				return await jsonResponse.ltlaName;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const postcodeSearch = async () => {
		console.log("searching for a postcode");
		const authority = await postcodeLookup();
		console.log("authority passed by postcode");
		console.log(authority);
		setSearchTerm(authority);
		authoritySearch(authority);
	};

	// useEffect(() => {
	// 	console.log("apps use effect");
	// 	if (searchOption === "postcode" && !data && searchTerm != "") {
	// 		authoritySearch();
	// 	}
	// });

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
					regionData={data ? data[data.length - 1] : null}
				/>
				{data ? (
					<Graph data={data} searchOption={searchOption} />
				) : null}
				<Attribution />
			</Grid>
		</div>
	);
}

export default App;
