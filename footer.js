const footer = document.querySelector("footer");
const next = footer.querySelector(".next");
const prev = footer.querySelector(".prev");
const currentStatus = footer.querySelector(".pagination");

let currentNum = 1;

const totalPagination = async (li) => {
  let obj;
  if (li == "popular") {
    obj = await api_dict.popular(1);
  }
  const { total_pages, results } = obj;
  return Math.ceil(total_pages / results.length);
};

const startPagination = async () => {
  const popularPages = await totalPagination("popular");
  if (currentNum == 1) {
    prev.classList.add("none");
  } else {
    prev.classList.remove("none");
  }
  if (currentNum == popularPages) {
    next.classList.add("none");
  } else {
    next.classList.remove("none");
  }
  currentStatus.textContent = `${currentNum} / ${popularPages}`;
  prev.addEventListener("click", () => {
    currentNum--;
    if (currentNum == 1) {
      prev.classList.add("none");
    } else {
      prev.classList.remove("none");
    }
    if (currentNum == popularPages) {
      next.classList.add("none");
    } else {
      next.classList.remove("none");
    }
    currentStatus.textContent = `${currentNum} / ${popularPages}`;
    localStorage.setItem("page", currentNum);
    createMovie();
  });
  next.addEventListener("click", () => {
    currentNum++;
    if (currentNum == 1) {
      prev.classList.add("none");
    } else {
      prev.classList.remove("none");
    }
    if (currentNum == popularPages) {
      next.classList.add("none");
    } else {
      next.classList.remove("none");
    }
    currentStatus.textContent = `${currentNum} / ${popularPages}`;
    localStorage.setItem("page", currentNum);
    createMovie();
  });
};

startPagination();
