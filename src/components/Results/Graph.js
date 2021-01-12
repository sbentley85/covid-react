import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GraphOption from "./GraphOption";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles({
	graphContainer: {
		display: "flex",
		justifyContent: "center",
		paddingBottom: "5rem",
	},
	optionContainer: {
		display: "flex",
		justifyContent: "center",
	},
});

const CustomisedAxisTick = (props) => {
	const { x, y, payload } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor="end"
				fill="#666"
				transform="rotate(-65)"
			>
				{payload.value}
			</text>
		</g>
	);
};

const Graph = (props) => {
	const classes = useStyles();
	const [graphOption, setGraphOption] = useState("NewConfirmed");

	const graphData = props.data
		? props.data.map((date) => {
				return {
					Active: date.Active,
					Confirmed: date.Confirmed,
					Deaths: date.Deaths,
					Date: date.Date.split("T")[0],
					NewDeaths: date.NewDeaths,
					NewConfirmed: date.NewConfirmed,
				};
		  })
		: null;

	const graphOptionChange = (event) => {
		setGraphOption(event.target.value);
	};

	return props.data ? (
		<>
			<Grid item xs={12} className={classes.optionContainer}>
				<GraphOption
					graphOption={!props.data ? "Confirmed" : graphOption}
					graphOptionChange={graphOptionChange}
					searchOption={props.searchOption}
				/>
			</Grid>

			<Grid item xs={12} className={classes.graphContainer}>
				<ResponsiveContainer width="90%" height={400}>
					<LineChart
						data={graphData}
						margin={{
							top: 10,
							right: 20,
							left: 0,
							bottom: 65,
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

						<Line
							type="monotone"
							dataKey={graphOption}
							stroke="#8884d8"
							activeDot={{ r: 8 }}
							dot={false}
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</Grid>
		</>
	) : (
		<></>
	);
};

export default Graph;
