import React, { useEffect, useState } from "react";
import { addCommas } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		margin: "1rem",
	},

	title: {
		fontSize: 16,
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

	return props.country != "" && props.country != null && props.data ? (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{props.country} data
				</Typography>
				<div className={classes.detailsRow}>
					<Typography variant="body2" component="span">
						Total Confirmed Cases:
					</Typography>
					<Typography variant="body2" component="span">
						{addCommas(props.data.TotalConfirmed)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body2" component="span">
						New Confirmed Cases:
					</Typography>
					<Typography variant="body2" component="span">
						{addCommas(props.data.NewConfirmed)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body2" component="span">
						Total Deaths:
					</Typography>
					<Typography variant="body2" component="span">
						{addCommas(props.data.TotalDeaths)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body2" component="span">
						New Deaths:
					</Typography>
					<Typography variant="body2" component="span">
						{addCommas(props.data.NewDeaths)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body2" component="span">
						Total Recovered Cases:
					</Typography>
					<Typography variant="body2" component="span">
						{addCommas(props.data.TotalRecovered)}
					</Typography>
				</div>
				<div className={classes.detailsRow}>
					<Typography variant="body2" component="span">
						New Recovered Cases:
					</Typography>
					<Typography variant="body2" component="span">
						{addCommas(props.data.NewRecovered)}
					</Typography>
				</div>
			</CardContent>
		</Card>
	) : (
		<></>
	);
};

export default SummaryCard;
