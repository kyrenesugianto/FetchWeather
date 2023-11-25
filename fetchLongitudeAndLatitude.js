export function fetchLongitudeAndLatitude(query) {
  // TODO
  // Kyrene Sugianto
  let searchURL = new URL("https://geocode.maps.co/search");
  searchURL.searchParams.append("q", query);

  return fetch(searchURL.toString())
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        throw new Error("No results found for query.");
      }
      else {
        return { lon: Number(data[0].lon), lat: Number(data[0].lat) };
      }
    });
}