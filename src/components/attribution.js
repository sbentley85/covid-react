import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	attribution: {
		justifyContent: "center",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: "4rem",
	},
	line: {
		textAlign: "center",
	},
}));

const Attribution = () => {
	const classes = useStyles();

	return (
		<Grid item xs={10} sm={8} className={classes.attribution}>
			<Typography
				variant="caption"
				component="p"
				className={classes.line}
			>
				International data sourced from{" "}
				<a href="https://about-corona.net/">about-corona api</a>
			</Typography>
			<Typography
				variant="caption"
				component="p"
				className={classes.line}
			>
				UK regional data sourced from{" "}
				<a href="https://coronavirus.data.gov.uk/">
					coronavirus.gov.uk
				</a>
			</Typography>
		</Grid>
	);
};

export default Attribution;
