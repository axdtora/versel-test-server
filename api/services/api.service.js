import axios from 'axios';
// import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';


const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	console.log(token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	}
	// const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
	// url.searchParams.append('q', city);
	// url.searchParams.append('appid', token);

	// https.get(url, (response) => {
	// 	let res = '';
	// 	response.on('data', (chunk) => {
	// 		if (chunk=='lat') {
	// 			res += chunk;
	// 		}
	// 		if (chunk=='lon') {
	// 			res += chunk;
	// 		}
	// 	});
	// 	response.on('end', () => {
	// 		console.log(res);
	// 	});
	// });

// const getWeather = async (lat ,lon) => {
// 	const token = await getKeyValue(TOKEN_DICTIONARY.token);
// 	console.log(token);
// 	if (!token) {
// 		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
// 	}
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			// lat: '44.34',
			// lon: '10.99',
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});
	console.log(data);
	// const url = new URL('https://api.openweathermap.org/data/2.5/weather');
	// url.searchParams.append('q', city);
	// url.searchParams.append('appid', token);
	// url.searchParams.append('lang', 'ru');
	// url.searchParams.append('units','metric');

	// https.get(url, (response) => {
	// 	let res = '';
	// 	response.on('data', (chunk) => {
	// 		res += chunk;
	// 	});
	// 	response.on('end', () => {
	// 		console.log(res);
	// 	});
	// });
};

export { getWeather }; 