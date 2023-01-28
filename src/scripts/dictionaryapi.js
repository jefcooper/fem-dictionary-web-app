/*******************************************************************************
 * dictionaryapi.js
 *
 * Interface to vendor https://dictionaryapi.dev
 *
 * Query using HTTP GET https://api.dictionaryapi.dev/api/v2/entries/en/keyboard
 *
 *******************************************************************************/

async function dictionarySearch(term) {
  const response = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + term
  );
  if (response.status !== 200) {
    const result = await response.json();
    result.error = response.status;
    return result;
  } else {
    return await response.json();
  }
}

export default dictionarySearch;
