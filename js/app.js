const submitBtn = document.querySelector(".submit");
const communityBtn = document.querySelector(".communityBtn");
const featuredBtn = document.querySelector(".featuredBtn");
const featuredContent = document.querySelector(".featuredContent");
const communityContent = document.querySelector(".communityContent");

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
