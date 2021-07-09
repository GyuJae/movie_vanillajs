//const footer = document.querySelector("footer");
const body = document.querySelector("body");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  const end =
    main.getBoundingClientRect().height -
    Math.abs(main.getBoundingClientRect().y);
  if (scrollY > end) {
    const upBtn = document.createElement("span");
    if (!header.classList.contains("fixed-nav")) {
      header.classList.add("fixed-nav");
    }
    localStorage.setItem("page", parseInt(localStorage.getItem("page")) + 1);
    createMovie();
  } else {
    if (header.classList.contains("fixed-nav")) {
      header.classList.remove("fixed-nav");
    }
  }
});
