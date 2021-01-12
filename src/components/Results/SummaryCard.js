import React from "react";
import { addCommas } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		margin: "1rem",
		backgroundColor: "#546e7a",
		color: "white",
	},

	title: {
		fontSize: 18,
		color: "white",
	},
	cardRow: {
		display: "flex",
		justifyContent: "center",
	},
	detailsRow: {
		display: "flex",
		justifyContent: "space-between",
		margin: "0.5rem 0",
	},
});

const SummaryCard = (props) => {
	const classes = useStyles();

	return props.searchTerm !== "" &&
		props.searchTerm !== null &&
		props.data ? (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{props.searchTerm} summary
				</Typography>
				<div className={classes.detailsRow}>
					<Typography variant="body1" component="span">
						Total Confirmed Cases:
					</Typography>
					<Typography variant="body1" component="span">
						{addCommas(
							props.data.TotalConfirmed || props.data.Confirmed
						)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body1" component="span">
						New Confirmed Cases:
					</Typography>
					<Typography variant="body1" component="span">
						{addCommas(props.data.NewConfirmed)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body1" component="span">
						Total Deaths:
					</Typography>
					<Typography variant="body1" component="span">
						{addCommas(props.data.TotalDeaths || props.data.Deaths)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body1" component="span">
						New Deaths:
					</Typography>
					<Typography variant="body1" component="span">
						{addCommas(props.data.NewDeaths)}
					</Typography>
				</div>
			</CardContent>
		</Card>
	) : (
		<></>
	);
};

export default SummaryCard;
