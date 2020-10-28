import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const SearchOption = () => {
	const [type, setType] = React.useState("");

	const handleChange = (event) => {
		setType(event.target.value);
	};

	return (
		<>
			<InputLabel id="demo-simple-select-label">Search for</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={type}
				onChange={handleChange}
			>
				<MenuItem value={"country"}>Country</MenuItem>
				<MenuItem value={"region"}>Region (UK only)</MenuItem>
				<MenuItem value={"postcode"}>Postcode (UK Only)</MenuItem>
			</Select>
		</>
	);
};

export default SearchOption;
