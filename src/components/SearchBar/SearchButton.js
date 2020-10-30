import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	searchButton: {
		margin: theme.spacing(1),
	},
}));

const SearchButton = (props) => {
	const classes = useStyles();
	return (
		<div>
			<Button
				className={classes.searchButton}
				variant="contained"
				color="primary"
				onClick={props.handleSearch}
			>
				Search
			</Button>
		</div>
	);
};

export default SearchButton;
