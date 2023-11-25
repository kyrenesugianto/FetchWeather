  export function fetchCurrentWeather(longitude, latitude) {
    // TODO
    // Ethan Phillips
    const searchURL = new URL("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&temperature_unit=fahrenheit");
    searchURL.searchParams.append("longitude", longitude);
    searchURL.searchParams.append("latitude", latitude);
  
    return fetch(searchURL.toString())
      .then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))
      .then(data => Promise.resolve(data.hourly));
  }

