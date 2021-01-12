import React from "react";
import SummaryCard from "./SummaryCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	cardRow: {
		display: "flex",
		justifyContent: "center",
	},
});

const SummaryCards = (props) => {
	const classes = useStyles();
	return props.globalSummary ? (
		<Grid item container xs={8} m={6} className={classes.cardRow}>
			{/* Card 1 */}
			{props.searchOption === "country" ? (
				<SummaryCard
					data={props.globalSummary}
					searchTerm={"Worldwide"}
				/>
			) : (
				<SummaryCard
					data={
						props.countrySummaries.filter((item) => {
							return item.Country === "UK";
						})[0]
					}
					searchTerm={"United Kingdom"}
				/>
			)}
			{/* Card 2 */}
			{props.searchOption === "country" ? (
				<SummaryCard
					data={
						props.countrySummaries.filter((item) => {
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

export default SummaryCards;
