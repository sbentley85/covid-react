import "./App.css";
import React, { useState } from "react";

// Component imports
import SearchBar from "../SearchBar/SearchBar";

// import search option arrays from utils
import { authorities } from "../../utils/authorities";
import { regions } from "../../utils/regions";
import { countries } from "../../utils/countries";

function App() {
	const [searchOption, setSearchOption] = React.useState("country");
	const [searchTerm, setSearchTerm] = React.useState("");
	const [optionList, setOptionList] = React.useState(countries);

	const termChange = (event, value) => {
		setSearchTerm(value);
	};

	const postcodeChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const searchOptionChange = (event) => {
		const option = event.target.value;
		setSearchOption(option);
		if (option === "country") setOptionList(countries);
		if (option === "region") setOptionList(regions);
		if (option === "authority") setOptionList(authorities);
		if (option === "postcode") setOptionList([]);
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
			/>
		</div>
	);
}

export default App;
