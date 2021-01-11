import "./App.css";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { formatUKData, formatCountryData } from "../../utils/utils";

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
		if (searchOption === "country") {
			if (searchTerm === "United Kingdom") {
				ukSearch();
			} else {
				countrySearch();
			}
		}
		if (searchOption === "region") regionSearch();
		if (searchOption === "authority") authoritySearch();
		if (searchOption === "postcode") postcodeSearch();
	};

	const ukSearch = async () => {
		// Added as data from covid19api.com for UK seems to be incorrect
		const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={"date":"date","areaName":"areaName","dailyCases":"newCasesBySpecimenDate","cumCases":"cumCasesBySpecimenDate","newDeaths":"newDeaths28DaysByDeathDate","cumDeaths":"cumDeaths28DaysByDeathDate"}`;
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			const jsonResponse = await response.json();
			const formattedData = formatUKData(jsonResponse.data);
			setData(formattedData);
		} catch (e) {
			console.log(e);
		}
	};

	const countrySearch = async () => {
		const url = `https://api.covid19api.com/total/dayone/country/${searchTerm}`;
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const jsonResponse = await response.json();
				console.log(jsonResponse);
				const formattedData = formatCountryData(jsonResponse);
				setData(formattedData);
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
				setData(formattedData);
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
				return await jsonResponse.ltlaName;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const postcodeSearch = async () => {
		const authority = await postcodeLookup();
		setSearchTerm(authority);
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
