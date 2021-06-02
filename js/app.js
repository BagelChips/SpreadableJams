"use strict";

const communityBtn = document.querySelector(".communityBtn");
const featuredBtn = document.querySelector(".featuredBtn");
const featuredContent = document.querySelector(".featuredContent");
const communityContent = document.querySelector(".communityContent");

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
  toggleHide(featuredBtn);
  toggleHide(featuredContent);
  toggleHide(communityBtn);
  toggleHide(communityContent);
});

featuredBtn.addEventListener("click", () => {
  toggleHide(featuredBtn);
  toggleHide(featuredContent);
  toggleHide(communityBtn);
  toggleHide(communityContent);
});

function toggleHide(element) {
  if (element.classList.contains("hide")) {
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

// Search object?

function search(track, artist) {
  let query = { track, artist };
  for (let key in query) {
    console.log(key + "=" + query[key]);
  }
}
