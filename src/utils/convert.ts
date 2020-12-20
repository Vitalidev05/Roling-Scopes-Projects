import {
	ICovid, MapCovid, Geometry, GeoJsonProperties,
 } from '@/types/Covid';
 
 const convertCovidToMapCovids = (data: ICovid[]): MapCovid<Geometry, GeoJsonProperties>[] => data.map(point => ({
	type: 'Feature',
	geometry: {
	  type: 'Point',
	  coordinates: [point.countryInfo.long, point.countryInfo.lat],
	},
	properties: {
	  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
	  id: point.countryInfo._id,
	  country: point.country,
	  province: point.continent,
	  cases: point.cases,
	  deaths: point.deaths,
	  iso: point.countryInfo.iso2,
	},
 }));
 
 export default convertCovidToMapCovids;
 