import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { updateSearchTerm, updateTimelineData } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
	textField: {
		margin: theme.spacing(1),
		width: "90%",
	},
}));

const SearchInput = (props) => {
	const classes = useStyles();
	const optionList = useSelector((state) => state.optionList);
	const searchTerm = useSelector((state) => state.searchTerm);

	const dispatch = useDispatch();

	const termChange = (event, value) => {
		dispatch(updateSearchTerm(value));
		dispatch(updateTimelineData(null));
	};

	const postcodeChange = (event) => {
		dispatch(updateSearchTerm(event.target.value));
	};

	return optionList.length === 0 ? (
		<TextField
			label="Location"
			onChange={postcodeChange}
			className={classes.textField}
			id="search"
		/>
	) : (
		<Autocomplete
			id="search"
			options={optionList}
			getOptionLabel={(option) => option}
			onChange={termChange}
			value={searchTerm}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Location"
					className={classes.textField}
				/>
			)}
		/>
	);
};

export default SearchInput;
