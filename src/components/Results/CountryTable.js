import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	tableRow: {
		height: "30rem",
		width: "90%",
		maxWidth: "1202px",
	},
}));

const CountryTable = () => {
	const classes = useStyles();
	const countryData = useSelector((state) => state.countrySummariesData);
	const tableData = countryData
		? countryData.map((country, index) => {
				country.id = index;
				return country;
		  })
		: null;

	const columns = [
		{ field: "Country", headerName: "Country", width: 130 },
		{
			field: "NewConfirmed",
			headerName: "Daily confimed",
			type: "number",
			width: 150,
		},
		{
			field: "TotalConfirmed",
			headerName: "Total confirmed",
			type: "number",
			width: 150,
		},
		{
			field: "CasesPerMillion",
			headerName: "Cases per million",
			type: "number",
			width: 150,
		},
		{
			field: "NewDeaths",
			headerName: "Daily Deaths",
			type: "number",
			width: 150,
		},
		{
			field: "TotalDeaths",
			headerName: "Total Deaths",
			type: "number",
			width: 150,
		},
		{
			field: "Critical",
			headerName: "Critical",
			type: "number",
			width: 150,
		},
		{
			field: "DeathRate",
			headerName: "Death rate",
			type: "number",
			width: 150,
		},
	];

	return (
		<>
			{countryData ? (
				<Grid container item className={classes.tableRow}>
					<DataGrid
						rows={tableData}
						columns={columns}
						sortModel={[
							{
								field: "TotalConfirmed",
								sort: "desc",
							},
						]}
					/>
				</Grid>
			) : (
				<></>
			)}
		</>
	);
};

export default CountryTable;
