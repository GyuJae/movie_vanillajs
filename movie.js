const api_key = "962cebc1820ada99a807125b7f1fdcbf";
localStorage.setItem("page", 1);

const fetchMovie = (url) =>
  fetch(url)
    .then((req) => req.json())
    .then((data) => data);

const api_dict = {
  popular: (pageNum) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${pageNum}`;
    return fetchMovie(url);
  },
};

const main = document.querySelector("main");
const modal_overlay = document.querySelector(".modal_overlay");
const modal_continer = modal_overlay.querySelector(".modal_container");
const close = modal_overlay.querySelector(".close");

const createMovie = async () => {
  const removeBox = main.querySelector(".movie_container");
  if (removeBox) {
    removeBox.remove();
  }
  const page = parseInt(localStorage.getItem("page"));
  const { results: movies } = await api_dict.popular(page);
  const movieContainer = document.createElement("div");
  movieContainer.className = "movie_container";
  movies.forEach((movie) => {
    const movieBox = document.createElement("div");
    movieBox.setAttribute("id", movie.id);
    movieBox.className = "movieBox";
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${
        movie.poster_path ? movie.poster_path : null
      }`
    );
    img.className = "img";
    movieBox.appendChild(img);
    const title = document.createElement("p");
    title.className = "title";
    title.textContent = movie.title;
    movieBox.appendChild(title);
    let modal_img;
    let text_box;
    movieBox.addEventListener("click", () => {
      modal_img = document.createElement("img");
      modal_img.className = "modal_img";
      modal_img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w300${
          movie.poster_path ? movie.poster_path : null
        }`
      );
      modal_continer.appendChild(modal_img);
      text_box = document.createElement("div");
      text_box.className = "text_box";

      modal_overlay.classList.remove("no_overlap");
    });
    close.addEventListener("click", () => {
      modal_overlay.classList.add("no_overlap");

      modal_img?.remove();
    });
    movieContainer.appendChild(movieBox);
  });
  main.appendChild(movieContainer);
};

createMovie();

const list_box = document.querySelectorAll(".list_box");
const li = document.querySelectorAll("li");

li.forEach((item, idx) => {
  item.addEventListener("mouseenter", () => {
    list_box[idx].classList.remove("none");
  });
  item.addEventListener("mouseleave", () => {
    list_box[idx].classList.add("none");
  });
});
