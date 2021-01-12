import React, { useEffect, useState } from "react";
import { formatCountrySummaries, formatGlobalSummary } from "../../utils/utils";

// component imports

import SummaryCards from "./SumaryCards";

const Summary = (props) => {
	const [countrySummaries, setCountrySummaries] = useState(null);
	const [globalSummary, setGlobalSummary] = useState(null);

	useEffect(() => {
		getCountrySummaries();
		getGlobalSummary();

		async function getCountrySummaries() {
			const url = "https://corona-api.com/countries";
			const response = await fetch(url);
			const jsonResponse = await response.json();
			const formattedData = formatCountrySummaries(jsonResponse.data);
			setCountrySummaries(formattedData);
		}

		async function getGlobalSummary() {
			const url = "https://corona-api.com/timeline";
			const response = await fetch(url);
			const jsonResponse = await response.json();
			const formattedData = formatGlobalSummary(jsonResponse.data);
			setGlobalSummary(formattedData);
		}
	}, []);

	return (
		<SummaryCards
			globalSummary={globalSummary}
			countrySummaries={countrySummaries}
			regionData={props.regionData}
			searchOption={props.searchOption}
			searchTerm={props.searchTerm}
		/>
	);
};

export default Summary;
