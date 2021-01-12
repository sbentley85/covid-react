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

export const formatUKData = (data) => {
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
	const formattedData = data.timeline
		.map((item, index) => {
			return {
				Deaths: item.deaths,
				Confirmed: item.confirmed,
				Date: item.date,
				Active: item.active,
				NewConfirmed: item.new_confirmed,
				NewDeaths: item.new_deaths,
			};
		})
		.reverse();
	return formattedData;
};

export const getCountryCode = async (country) => {
	const response = await fetch("https://corona-api.com/countries");
	const jsonResponse = await response.json();
	const code = await jsonResponse.data.filter((item) => {
		return item.name === country;
	})[0].code;
	return code;
};

export const formatCountrySummaries = (data) => {
	const formattedData = data.map((country) => {
		return {
			Country: country.name,
			NewConfirmed: country.today.confirmed,
			TotalConfirmed: country.latest_data.confirmed,
			NewDeaths: country.today.deaths,
			TotalDeaths: country.latest_data.deaths,
		};
	});
	return formattedData;
};

export const formatGlobalSummary = (data) => {
	const formattedData = {
		NewConfirmed: data[0].new_confirmed,
		TotalConfirmed: data[0].confirmed,
		NewDeaths: data[0].new_deaths,
		TotalDeaths: data[0].deaths,
	};

	return formattedData;
};
