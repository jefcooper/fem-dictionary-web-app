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
  return await response.json();
}

export default dictionarySearch;
