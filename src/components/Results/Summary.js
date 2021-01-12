import React, { useEffect, useState } from "react";
import { formatCountrySummaries, formatGlobalSummary } from "../../utils/utils";

// component imports

import SummaryCards from "./SumaryCards";

const Summary = (props) => {
	const [worldData, setWorldData] = useState(null);
	const [countrySummaries, setCountrySummaries] = useState([]);
	const [globalSummary, setGlobalSummary] = useState([]);

	useEffect(() => {
		// check if worldData already exists in session storeage
		// if (!worldData) {
		// 	if (sessionStorage.getItem("worldData")) {
		// 		const data = JSON.parse(sessionStorage.getItem("worldData"));

		// 		setWorldData(data);
		// 	} else {
		// 		getCountrySummaries();
		// 		getData();
		// 	}
		// }

		getCountrySummaries();
		getGlobalSummary();
		getData();

		async function getCountrySummaries() {
			const url = "https://corona-api.com/countries";
			const response = await fetch(url);
			const jsonResponse = await response.json();
			const formattedData = formatCountrySummaries(jsonResponse.data);
			console.log(formattedData);
			setCountrySummaries(formattedData);
		}

		async function getGlobalSummary() {
			const url = "https://corona-api.com/timeline";
			const response = await fetch(url);
			const jsonResponse = await response.json();
			const formattedData = formatGlobalSummary(jsonResponse.data);

			setGlobalSummary(formattedData);
		}

		async function getData() {
			console.log("getting data");
			const url = `https://api.covid19api.com/summary`;
			const requestOptions = {
				method: "GET",
				redirect: "follow",
			};
			try {
				const response = await fetch(url, requestOptions);
				if (response.ok) {
					const jsonResponse = await response.json();

					setWorldData(jsonResponse);
					if (!sessionStorage.getItem("worldData")) {
						sessionStorage.setItem(
							"worldData",
							JSON.stringify(jsonResponse)
						);
					}

					return;
				}
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return (
		<SummaryCards
			worldData={worldData}
			globalSummary={globalSummary}
			countrySummaries={countrySummaries}
			regionData={props.regionData}
			searchOption={props.searchOption}
			searchTerm={props.searchTerm}
		/>
	);
};

export default Summary;
