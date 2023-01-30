/*******************************************************************************
 * dictionaryapi.js
 *
 * Interface to vendor https://dictionaryapi.dev
 *
 * Query using HTTP GET https://api.dictionaryapi.dev/api/v2/entries/en/keyboard
 *
 *******************************************************************************/

async function dictionarySearch(term) {
  try {
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
  } catch (err) {
    console.log(err);
    return {
      error: 500,
      title: "severe error",
      message: "could not reach dictionary api",
    };
  }
}

export default dictionarySearch;
