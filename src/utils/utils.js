// Functions used to populate regions, authorities & countries files used for autofill options

// // imports
// const fs = require("fs");
// const fetch = require("node-fetch");

// // // types of regions used by gov.uk api
// // const regionString = "region";
// // const authorityString = "ltla";

// // Get areas function gets all area options for a given type

// const getAreas = async (regionType) => {
// 	const resultsArray = [];
// 	const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=${regionType};date=2020-10-23&structure=["areaName"]`;

// 	const requestOptions = {
// 		method: "GET",
// 	};

// 	try {
// 		const response = await fetch(url, requestOptions);

// 		if (response.ok) {
// 			const jsonResponse = await response.json();
// 			const data = await jsonResponse.data;
// 			data.forEach((item) => {
// 				resultsArray.push(item[0]);
// 			});
// 			return resultsArray;
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// // Get countries function

// const getCountries = async () => {
// 	const url = "https://api.covid19api.com/countries";
// 	const resultsArray = [];

// 	try {
// 		const response = await fetch(url, {});
// 		if (response.ok) {
// 			const jsonResponse = await response.json();
// 			jsonResponse.forEach((item) => {
// 				resultsArray.push(item.Country);
// 			});
// 			console.log(resultsArray);
// 			return resultsArray.sort();
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// // function to write array of areas to a separate file
// const writeArray = (name, array) => {
// 	console.log(array[0]);
// 	let outputString = `const ${name} = [`;
// 	for (let i = 0; i < array.length - 1; i++) {
// 		outputString += `"${array[i]}",`;
// 	}
// 	outputString += `"${array[array.length - 1]}"]`;

// 	fs.writeFile(`${name}.js`, outputString, (err) => {
// 		console.log(err);
// 	});
// };

// async function calls to create options files
// (async () => {
// 	// const authoritiesArray = await getAreas(authorityString);
// 	// const regionsArray = await getAreas(regionString);
// 	const countriesArray = await getCountries();
// 	// writeArray("regions", regionsArray);
// 	// writeArray("authorities", authoritiesArray);
// 	writeArray("countries", countriesArray);
// })();

// converts number to string with commas for display
export const addCommas = (number) => {
	let nStr = number.toString();
	nStr += "";
	let x = nStr.split(".");
	let x1 = x[0];
	let x2 = x.length > 1 ? "." + x[1] : "";
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1,$2");
	}
	return x1 + x2;
};

export const formatRegionSummaryData = (data) => {
	return {
		TotalConfirmed: "",
		NewConfirmed: "",
		TotalDeaths: "",
		NewDeaths: "",
	};
};

export const formatRegionData = (data) => {
	const formattedData = data.slice(1).map((item) => {
		return {
			Date: item.date,
			Confirmed: item.cumCases || 0,
			NewConfirmed: item.dailyCases || 0,
			Deaths: item.cumDeaths || 0,
			NewDeaths: item.newDeaths || 0,
		};
	});

	const reversedData = formattedData.reverse();
	return reversedData;
};

export const formatCountryData = (data) => {
	const formattedData = data.map((item, index) => {
		return {
			Deaths: item.Deaths,
			Confirmed: item.Confirmed,
			Date: item.Date,
			Active: item.Active,
			NewConfirmed:
				index === 0
					? item.Confirmed
					: item.Confirmed - data[index - 1].Confirmed,
			NewDeaths:
				index === 0
					? item.Deaths
					: item.Deaths - data[index - 1].Deaths,
		};
	});
	return formattedData;
};
