import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	tableContainer: {},
	table: {
		width: "1100px",
		height: "30rem",
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
		{ field: "id", headerName: "Id", width: 0 },

		{ field: "Country", headerName: "Country", width: 130 },
		{
			field: "NewConfirmed",
			headerName: "Daily confimed",
			type: "number",
			width: 130,
		},
		{
			field: "TotalConfirmed",
			headerName: "Total confirmed",
			type: "number",
			width: 130,
		},
		{
			field: "NewDeaths",
			headerName: "Daily Deaths",
			type: "number",
			width: 130,
		},
		{
			field: "TotalDeaths",
			headerName: "Total Deaths",
			type: "number",
			width: 130,
		},
		{
			field: "Critical",
			headerName: "Critical",
			type: "number",
			width: 130,
		},
		{
			field: "DeathRate",
			headerName: "Death rate",
			type: "number",
			width: 130,
		},
		{
			field: "CasesPerMillion",
			headerName: "Cases per million",
			type: "number",
			width: 130,
		},
	];

	return (
		<div>
			{countryData ? (
				<Grid container className={classes.tableContainer}>
					<Grid item className={classes.table}>
						<DataGrid rows={tableData} columns={columns} />
					</Grid>
				</Grid>
			) : (
				<></>
			)}
		</div>
	);
};

export default CountryTable;
