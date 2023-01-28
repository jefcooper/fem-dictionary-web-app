/******************************************************************************
 * select - custom select that can be styled independent of user-agent styles
 *
 * usage:
 *
 *  data-select, add this data attribute to a div surrounding select.
 *  add option elements as usual.  The native select/option will be used
 *  to create the custom select.
 *
 *******************************************************************************/

import arrowDown from "../assets/icon-arrow-down.svg";
import element from "./element-factory";

// get all the custom select elements
const allSelectElements = Array.from(
  document.querySelectorAll("[data-select]")
);

allSelectElements.forEach(debugLog);
allSelectElements.forEach(watchState);
allSelectElements.forEach(createSelectBox);

document.addEventListener("click", (evt) => {
  allSelectElements.forEach((el) => {
    const c = Array.from(el.children).find((e) =>
      e.classList.contains("select__control")
    );
    if (c.getAttribute("aria-expanded") === "true") {
      c.setAttribute("aria-expanded", "false");
    }
  });
});

/**
 * Log to debug the content of the elements found.
 *
 * @param {custom select element} el
 */
function debugLog(el) {
  const selectEl = selectFromDiv(el);
  console.log("[data-select]");
  console.log("current value: " + selectEl.value);
  Array.from(selectEl.children)
    .filter((e) => e.nodeName === "OPTION")
    .forEach((e) => {
      console.log("option: " + e.value);
    });
}

/**
 *
 * @param {custom select element} el
 */
function watchState(el) {
  const selectEl = selectFromDiv(el);

  selectEl.addEventListener("change", (evt) => {
    console.log("new value: " + evt.target.value);
  });
  el.addEventListener("click", (evt) => {
    console.log("click");
    console.log(evt.target);
  });
  document.addEventListener("click", (evt) => {
    console.log("global click");
  });
}

function selectFromDiv(el) {
  return Array.from(el.children).find((e) => e.nodeName === "SELECT");
}

function selectOptions(selectEl) {
  return Array.from(selectEl.children).filter((e) => e.nodeName === "OPTION");
}

function createSelectBox(parentDiv) {
  const selectEl = selectFromDiv(parentDiv);
  const divEl = element("div")
    .class("select__control")
    .attribute("aria-expanded", "false")
    .attribute("tabindex", 0)
    .addTo(parentDiv);
  element("span").text(selectEl.value).addTo(divEl);
  element("img")
    .attribute("src", arrowDown)
    .attribute("aria-hidden", "true")
    .class("icon")
    .class("icon-arrow-down")
    .addTo(divEl);

  divEl.addEventListener("click", (evt) => {
    const expanded = divEl.getAttribute("aria-expanded") === "true";
    if (expanded) {
      divEl.setAttribute("aria-expanded", "false");
    } else {
      divEl.setAttribute("aria-expanded", "true");
    }
    evt.preventDefault();
    evt.stopPropagation();
  });
  divEl.addEventListener("keydown", (evt) => {
    console.log(evt.key);
    if (evt.key === "Enter" || evt.key === " " || evt.key === "Escape") {
      const expanded = divEl.getAttribute("aria-expanded") === "true";
      if (expanded) {
        divEl.setAttribute("aria-expanded", "false");
      } else {
        if (evt.key !== "Escape") {
          divEl.setAttribute("aria-expanded", "true");
        }
      }
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
  const popupDiv = element("div").class("select__popup").addTo(parentDiv);
  const options = selectOptions(selectEl);

  const optionList = element("ul").addTo(popupDiv);
  options.forEach((opt) => {
    const className = "text--" + opt.value.replaceAll(" ", "-").toLowerCase();
    const liEl = element("li")
      .text(opt.value)
      .class(className)
      .addTo(optionList);
    liEl.addEventListener("click", (evt) => {
      console.log("click, option: " + liEl.innerText);
      divEl.children[0].innerText = liEl.innerText;
      selectEl.value = liEl.innerText;
      selectEl.dispatchEvent(new Event("change"));
      divEl.setAttribute("aria-expanded", "false");
      evt.preventDefault();
      evt.stopPropagation();
    });
  });
}
