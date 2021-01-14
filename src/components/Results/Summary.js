import React, { useEffect } from "react";
import { formatCountrySummaries, formatGlobalSummary } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateGlobalSummary, updateCountrySummaries } from "../../actions";

// component imports
import SummaryCards from "./SumaryCards";

const Summary = (props) => {
	// redux store variables

	const searchOption = useSelector((state) => state.searchOption);

	const dispatch = useDispatch();

	useEffect(() => {
		getCountrySummaries();
		getGlobalSummary();

		async function getCountrySummaries() {
			const url = "https://corona-api.com/countries";
			const response = await fetch(url);
			const jsonResponse = await response.json();
			const formattedData = formatCountrySummaries(jsonResponse.data);
			dispatch(updateCountrySummaries(formattedData));
		}

		async function getGlobalSummary() {
			const url = "https://corona-api.com/timeline";
			const response = await fetch(url);
			const jsonResponse = await response.json();
			const formattedData = formatGlobalSummary(jsonResponse.data);
			dispatch(updateGlobalSummary(formattedData));
		}
	}, []);

	return (
		<SummaryCards
			regionData={props.regionData}
			searchOption={searchOption}
		/>
	);
};

export default Summary;
