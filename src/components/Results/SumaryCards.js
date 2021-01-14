import React from "react";
import SummaryCard from "./SummaryCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
	cardRow: {
		display: "flex",
		justifyContent: "center",
	},
});

const SummaryCards = (props) => {
	const classes = useStyles();

	const searchTerm = useSelector((state) => state.searchTerm);
	const searchOption = useSelector((state) => state.searchOption);
	const globalSummaryData = useSelector((state) => state.globalSummaryData);
	const timelineData = useSelector((state) => state.timelineData);
	const countrySummariesData = useSelector(
		(state) => state.countrySummariesData
	);

	return globalSummaryData ? (
		<Grid item container xs={8} m={6} className={classes.cardRow}>
			{/* Card 1 */}
			{searchOption === "country" ? (
				<SummaryCard
					data={globalSummaryData}
					searchTerm={"Worldwide"}
				/>
			) : (
				<SummaryCard
					data={
						countrySummariesData.filter((item) => {
							return item.Country === "UK";
						})[0]
					}
					searchTerm={"United Kingdom"}
				/>
			)}
			{/* Card 2 */}
			{searchOption === "country" ? (
				<SummaryCard
					data={
						countrySummariesData.filter((item) => {
							return item.Country === searchTerm;
						})[0] || null
					}
					searchTerm={searchTerm}
				/>
			) : (
				<SummaryCard
					data={
						timelineData
							? timelineData[timelineData.length - 1]
							: null
					}
					searchTerm={searchTerm}
				/>
			)}
		</Grid>
	) : (
		<></>
	);
};

export default SummaryCards;
