import "./App.css";
import React, { useState } from "react";

// Component imports
import SearchBar from "../SearchBar/SearchBar";
import WorldData from "../Results/WorldData";

// import search option arrays from utils
import { authorities } from "../../utils/authorities";
import { regions } from "../../utils/regions";
import { countries } from "../../utils/countries";

function App() {
	// state variables
	const [searchOption, setSearchOption] = useState("country");
	const [searchTerm, setSearchTerm] = useState("");
	const [optionList, setOptionList] = useState(countries);
	const [data, setData] = useState(null);

	const termChange = (event, value) => {
		setSearchTerm(value);
	};

	const postcodeChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const searchOptionChange = (event) => {
		const option = event.target.value;
		setSearchTerm("");
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
	};

	const authoritySearch = async () => {
		console.log("searching for an authority");
	};

	const postcodeSearch = async () => {
		console.log("searching for a postcode");
	};

	return (
		<div className="App">
			<SearchBar
				searchOption={searchOption}
				searchOptionChange={searchOptionChange}
				searchTerm={searchTerm}
				termChange={termChange}
				postcodeChange={postcodeChange}
				optionList={optionList}
				handleSearch={handleSearch}
			/>
			<WorldData country={searchTerm} />
		</div>
	);
}

export default App;
