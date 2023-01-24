import dictionarySearch from "./dictionaryapi.js";

const searchButton = document.getElementById("search-button");
const searchTerm = document.getElementById("search-term");
const searchResult = document.getElementById("search-result");
const resultWord = document.getElementById("result-word");
const resultPronunciation = document.getElementById("result-pronunciation");
const resultAudio = document.getElementById("result-audio");

searchButton.addEventListener("click", (evt) => {
  dictionarySearch(searchTerm.value).then((result) => {
    const resultText = JSON.stringify(result, null, "...");
    searchResult.innerText = resultText;
    console.log(result[0].word);
    console.log(result[0].phonetic);
    resultWord.innerText = result[0].word;
    resultPronunciation.innerText = result[0].phonetic;

    let audio = result[0].phonetics.find((e) => {
      return e.audio;
    });
    resultAudio.setAttribute("src", audio.audio);
  });
});
