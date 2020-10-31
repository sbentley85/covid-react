import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles({
	graphContainer: {
		display: "flex",
		justifyContent: "center",
		paddingBottom: "5rem",
	},
});

const CustomisedAxisTick = (props) => {
	const { x, y, stroke, payload } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor="end"
				fill="#666"
				transform="rotate(-35)"
			>
				{payload.value}
			</text>
		</g>
	);
};

const Graph = (props) => {
	const classes = useStyles();

	const graphData = props.data
		? props.data.map((date) => {
				return {
					Active: date.Active,
					Confirmed: date.Confirmed,
					Deaths: date.Deaths,
					Date: date.Date.split("T")[0],
				};
		  })
		: null;

	return props.data ? (
		<Grid item xs={12} className={classes.graphContainer}>
			<ResponsiveContainer width="80%" height={400}>
				<LineChart
					width={500}
					height={300}
					data={graphData}
					margin={{
						top: 20,
						right: 20,
						left: 20,
						bottom: 45,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="Date"
						tickCount={5}
						interval={"preserveStartEnd"}
						tick={<CustomisedAxisTick />}
					/>
					<YAxis />
					<Tooltip />
					<Legend verticalAlign="top" />
					<Line
						type="monotone"
						dataKey="Confirmed"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
						dot={false}
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="Deaths"
						stroke="#82ca9d"
					/>
				</LineChart>
			</ResponsiveContainer>
		</Grid>
	) : (
		<></>
	);
};

export default Graph;
