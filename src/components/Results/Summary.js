import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// component imports
import SummaryCard from "./SummaryCard";

const useStyles = makeStyles({
	cardRow: {
		display: "flex",
		justifyContent: "center",
	},
});

const Summary = (props) => {
	const [worldData, setWorldData] = useState(null);
	const classes = useStyles();

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
	});
	return worldData ? (
		<Grid item container xs={8} m={6} className={classes.cardRow}>
			{props.searchOption === "country" ? (
				<SummaryCard data={worldData.Global} searchTerm={"Worldwide"} />
			) : (
				<SummaryCard
					data={
						worldData.Countries.filter((item) => {
							return item.Country === "United Kingdom";
						})[0]
					}
					searchTerm={"United Kingdom"}
				/>
			)}
			{props.searchOption === "country" ? (
				<SummaryCard
					data={
						worldData.Countries.filter((item) => {
							return item.Country === props.searchTerm;
						})[0]
					}
					searchTerm={props.searchTerm}
				/>
			) : (
				<SummaryCard
					data={props.regionData}
					searchTerm={props.searchTerm}
				/>
			)}
		</Grid>
	) : (
		<></>
	);
};

export default Summary;
