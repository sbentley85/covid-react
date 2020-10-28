// imports
const fs = require("fs");
const fetch = require("node-fetch");

// types of regions used by gov.uk api
const regionString = "region";
const authorityString = "ltla";

// Get areas function gets all area options for a given type

const getAreas = async (regionType) => {
	const resultsArray = [];
	const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=${regionType};date=2020-10-23&structure=["areaName"]`;

	const requestOptions = {
		method: "GET",
	};

	try {
		const response = await fetch(url, requestOptions);

		if (response.ok) {
			const jsonResponse = await response.json();
			const data = await jsonResponse.data;
			data.forEach((item) => {
				resultsArray.push(item[0]);
			});
			return resultsArray;
		}
		cl;
	} catch (error) {
		console.log(error);
	}
};

// function to write array of areas to a separate file
const writeArray = (name, array) => {
	console.log(array[0]);
	let outputString = `const ${name} = [`;
	for (let i = 0; i < array.length - 1; i++) {
		outputString += `"${array[i]}",`;
	}
	outputString += `"${array[array.length - 1]}"]`;

	fs.writeFile(`${name}.js`, outputString, (err) => {
		console.log(err);
	});
};

// async function calls
(async () => {
	const authoritiesArray = await getAreas(authorityString);
	const regionsArray = await getAreas(regionString);

	writeArray("regions", regionsArray);
	writeArray("authorities", authoritiesArray);
})();
