export function fetchUniversities(query) {
    // TODO
    // Kailin Luo
  const searchURL = new URL("https://university-web-api.herokuapp.com/search");
  searchURL.searchParams.append("name", query);

  return fetch(searchURL.toString())
    .then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))
    .then(data => Promise.resolve(data.map(o => o.name)));
}

//console.log(fetchUniverisities("University of Massachusetts Amherst"));
