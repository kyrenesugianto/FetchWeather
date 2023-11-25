import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchUniversities } from "./fetchUniversities.js"

export function fetchUniversityWeather(query) {
  const avgTemp = uni => fetchLongitudeAndLatitude(uni)
    .then(pos => fetchCurrentWeather(pos.lon, pos.lat))
    .then(weather => weather.temperature_2m.reduce((sum, temp) => sum + temp, 0) / weather.temperature_2m.length);

  const createObj = temps => (obj, uni, index) => {
    obj[uni] = temps[index];
    obj.totalAverage += temps[index] / temps.length;
    return obj;
  }

  return fetchUniversities(query).then(data => Array.isArray(data) && data.length > 0 ? 
    Promise.all(data.map(avgTemp)).then(temps => data.reduce(createObj(temps), {totalAverage: 0})) :
    Promise.reject(new Error("No results found for query.")));
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California");
}