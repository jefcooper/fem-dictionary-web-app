import dictionarySearch from "./dictionaryapi.js";

const searchButton = document.getElementById("search-button");
const searchTerm = document.getElementById("search-term");
const searchResult = document.getElementById("search-result");

searchButton.addEventListener("click", (evt) => {
  dictionarySearch(searchTerm.value).then((result) => {
    const resultText = JSON.stringify(result);
    searchResult.innerText = resultText;
  });
});
