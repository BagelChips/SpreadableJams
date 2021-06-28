"use strict";

const communityBtn = document.querySelector(".communityBtn");
const featuredBtn = document.querySelector(".featuredBtn");
const featuredContent = document.querySelector(".featuredContent");
const communityContent = document.querySelector(".communityContent");
const contentAndButtons = [
  communityBtn,
  featuredBtn,
  featuredContent,
  communityContent,
];

//

// --Modal Functionality---

const modalBtn = document.querySelector(".modal-button");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");

modalBtn.addEventListener("click", () => {
  modalBg.classList.add("visible");
});

modalClose.addEventListener("click", () => {
  modalBg.classList.remove("visible");
});

communityBtn.addEventListener("click", () => {
  toggleClass(contentAndButtons, "hide");
});

featuredBtn.addEventListener("click", () => {
  toggleClass(contentAndButtons, "hide");
});

let toggleClass = function (elements, className) {
  for (let each of elements) {
    if (each.classList.contains(className)) {
      each.classList.remove(className);
    } else {
      each.classList.add(className);
    }
  }
};
