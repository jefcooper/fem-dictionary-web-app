import "./prefersColorScheme";

import dictionarySearch from "./dictionaryapi.js";
import ElementFactory from "./element-factory.js";

const searchButton = document.getElementById("search-button");
const searchTerm = document.getElementById("search-term");

searchButton.addEventListener("click", (evt) => {
  dictionarySearch(searchTerm.value).then((result) => {
    fillKeyword(result[0]);
    fillDefinitions(result);
  });
});

function fillKeyword(data) {
  // data-keyword, data-pronunciation, data-audio
  const termEl = document.querySelector("[data-keyword--term]");
  termEl.innerText = data.word;

  const pronunciationEl = document.querySelector(
    "[data-keyword--pronunciation]"
  );
  pronunciationEl.innerText = data.phonetic;

  // return first non-empty audio tag
  let audioUrl = data.phonetics.find((e) => {
    return e.audio;
  });
  const audioEl = document.querySelector("[data-keyword--audio]");
  audioEl?.setAttribute("src", audioUrl.audio);
}

function fillDefinitions(data) {
  const definitions = document.querySelector("[data-definitions]");
  // clear contents if any
  definitions.innerText = "";

  for (const result of data) {
    for (const partOfSpeech of result.meanings) {
      new ElementFactory("h2")
        .text(partOfSpeech.partOfSpeech)
        .class("definition__part-of-speech")
        .addTo(definitions);
      new ElementFactory("h3")
        .text("Meaning")
        .class("definition__meaning-label")
        .addTo(definitions);
      const ulEl = new ElementFactory("ul").addTo(definitions);

      for (const defn of partOfSpeech.definitions) {
        const liEl = new ElementFactory("li").addTo(ulEl);
        const defnTextEl = new ElementFactory("p")
          .text(defn.definition)
          .class("definition__text")
          .addTo(liEl);
        if (defn.example) {
          new ElementFactory("p")
            .text(defn.example)
            .class("definition__example")
            .addTo(liEl);
        }

        if (defn.synonyms.length) {
          new ElementFactory("h4")
            .text("Synonyms")
            .class("definition__synonym-label")
            .addTo(liEl);
          const defnSynUlEl = new ElementFactory("ul")
            .class("definition__synonym-list")
            .addTo(liEl);
          for (const syn of defn.synonyms) {
            new ElementFactory("li")
              .class("definition__synonym")
              .text(syn)
              .addTo(defnSynUlEl);
          }
        }
        if (defn.antonyms.length) {
          new ElementFactory("h4")
            .text("Antonyms")
            .class("definition__antonym-label")
            .addTo(liEl);
          const defnAntUlEl = new ElementFactory("ul")
            .class("definition__antonym-list")
            .addTo(liEl);
          for (const ant of defn.antonyms) {
            new ElementFactory("li")
              .class("definition__antonym")
              .text(ant)
              .addTo(liEl);
          }
        }
      }
      if (partOfSpeech.synonyms.length) {
        new ElementFactory("h3")
          .text("Synonyms")
          .class("definition__synonym-label")
          .addTo(definitions);
        const synUlEl = new ElementFactory("ul")
          .class("definition__synonym-list")
          .addTo(definitions);

        for (const syn of partOfSpeech.synonyms) {
          new ElementFactory("li")
            .text(syn)
            .class("definition__synonym")
            .addTo(synUlEl);
        }
      }
      if (partOfSpeech.antonyms.length) {
        new ElementFactory("h3")
          .text("Antonyms")
          .class("definition__antonym-label")
          .addTo(definitions);
        const antUlEl = new ElementFactory("ul")
          .class("definition__antonym-list")
          .addTo(definitions);

        for (const ant of partOfSpeech.antonyms) {
          new ElementFactory("li")
            .text(ant)
            .class("definition__antonym")
            .addTo(antUlEl);
        }
      }
    }
    new ElementFactory("h4")
      .text("Source")
      .class("definition__source-label")
      .addTo(definitions);
    const defnSourceList = new ElementFactory("ul")
      .class("definition__source-list")
      .addTo(definitions);
    for (const url of result.sourceUrls) {
      const sourceItem = new ElementFactory("li")
        .text(url)
        .class("definition__source-url")
        .addTo(defnSourceList);
      new ElementFactory("a")
        .attribute("href", url)
        .attribute("target", "_blank")
        .text("X")
        .addTo(sourceItem);
    }
  }
}
