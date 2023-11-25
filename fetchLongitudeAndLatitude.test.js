import assert from "node:assert";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";

test("fetchLongitudeAndLatitude follows type specification", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object"); //  Assert the result is an object
    assert(typeof result.lon === "number"); // Assert that the lon value is a number
    assert(typeof result.lat === "number"); // Assert that the lat value is a number
    assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
  });
});

test("fetchLongitudeAndLatitude follows type specification", async () => {
  const promise = fetchLongitudeAndLatitude("University of Massachusetts Amherst");
  assert(typeof promise === "object" && typeof promise.then === "function");

  const result = await promise;
  assert(typeof result === "object"); // Assert the result is an object
  assert("lon" in result); // Assert the "lon" field is present
  assert("lat" in result); // Assert the "lat" field is present
  assert(Object.keys(result).length === 2); // Assert there are only two keys in the object

  assert(typeof result.lon === "number"); // Assert that the lon value is a number
  assert(typeof result.lat === "number"); // Assert that the lat value is a number
});

test("fetchLongitudeAndLatitude works with a valid query", () => {
  return fetchLongitudeAndLatitude("University of Massachusetts Amherst")
    .then((result) => {
      assert(result.lon === -72.52991477067445);
      assert(result.lat === 42.3869382);
    });
});

test("fetchLongitudeAndLatitude works with another valid query that has multiple locations", async () => {
  // should return the first result: UC Berkeley
  return fetchLongitudeAndLatitude("University of California") 
    .then((result) => {
      assert(result.lon === -122.23963364918777);
      assert(result.lat === 37.8753497);
    });
});
  
test("fetchLongitudeAndLatitude does not work with an empty query", () => {
  return fetchLongitudeAndLatitude("").catch((error) => {
    assert(error.message === "No results found for query.");
  });
});

test("fetchLongitudeAndLatitude does not work with an invalid query", () => {
  return fetchLongitudeAndLatitude("jdnvkjsbd").catch((error) => {
    assert(error.message === "No results found for query.");
  });
});

test("fetchLongitudeAndLatitude does not work with another invalid query", () => {
  return fetchLongitudeAndLatitude("12345").catch((error) => {
    assert(error.message === "No results found for query.");
  });
});