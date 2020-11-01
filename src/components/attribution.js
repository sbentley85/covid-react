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
		marginTop: "5rem",
	},
}));

const Attribution = () => {
	const classes = useStyles();

	return (
		<Grid item xs={10} sm={8} className={classes.attribution}>
			<Typography variant="caption" component="p">
				International data sourced from{" "}
				<a href="https://github.com/CSSEGISandData/COVID-19">
					Johns Hopkins CSSE
				</a>{" "}
				via <a href="https://covid19api.com/">Covid 19 API</a>
			</Typography>
			<Typography variant="caption" component="p">
				UK regional data sourced from{" "}
				<a href="https://coronavirus.data.gov.uk/">coronavirus.go.uk</a>
			</Typography>
		</Grid>
	);
};

export default Attribution;
