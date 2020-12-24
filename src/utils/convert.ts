import {
	ICovid, MapCovid, Geometry, GeoJsonProperties,
 } from '@/types/Covid';
 
 const convertCovidToMapCovids = (
	data: ICovid[],
	id: string
 ): MapCovid<Geometry, GeoJsonProperties>[] => {
	if (id === 'TodayCases') {
	  return data.map(point => ({
		 type: 'Feature',
		 geometry: {
			type: 'Point',
			coordinates: [point.countryInfo.long, point.countryInfo.lat],
		 },
		 properties: {
			/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
			id: point.countryInfo._id,
			country: point.country,
			cases: point.todayCases,
			deaths: point.todayDeaths,
			recovered: point.todayRecovered,
			iso: point.countryInfo.iso2,
		 },
	  }));
	}
	if (id === 'IncidenceRate') {
	  return data.map(point => ({
		 type: 'Feature',
		 geometry: {
			type: 'Point',
			coordinates: [point.countryInfo.long, point.countryInfo.lat],
		 },
		 properties: {
			/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
			id: point.countryInfo._id,
			country: point.country,
			cases: +(point.casesPerOneMillion / 10).toFixed(0),
			deaths: +(point.deathsPerOneMillion / 10).toFixed(0),
			recovered: +(point.recoveredPerOneMillion / 10).toFixed(0),
			iso: point.countryInfo.iso2,
		 },
	  }));
	}
	return data.map(point => ({
	  type: 'Feature',
	  geometry: {
		 type: 'Point',
		 coordinates: [point.countryInfo.long, point.countryInfo.lat],
	  },
	  properties: {
		 /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
		 id: point.countryInfo._id,
		 country: point.country,
		 cases: point.cases,
		 deaths: point.deaths,
		 recovered: point.recovered,
		 iso: point.countryInfo.iso2,
	  },
	}));
 };
 
 export default convertCovidToMapCovids;
 