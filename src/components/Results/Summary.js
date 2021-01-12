import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// component imports

import SummaryCards from "./SumaryCards";

const Summary = (props) => {
	const [worldData, setWorldData] = useState(null);

	useEffect(() => {
		if (!worldData) {
			if (sessionStorage.getItem("worldData")) {
				const data = JSON.parse(sessionStorage.getItem("worldData"));

				setWorldData(data);
			} else {
				getData();
			}
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
					console.log(jsonResponse);
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
	}, [worldData]);

	return (
		<SummaryCards
			worldData={worldData}
			regionData={props.regionData}
			searchOption={props.searchOption}
			searchTerm={props.searchTerm}
		/>
	);
};

export default Summary;
