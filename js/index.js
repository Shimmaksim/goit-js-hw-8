"use strict";
import imageList from "./task-1.js";

const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const imageModalWindow = document.querySelector(".lightbox___image");
const content = document.querySelector(".lightbox__content");
const closeButton = document.querySelector(".material-icons");

const createLi = item => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${item.preview}
  >
    <img
      class="gallery__image"
      src=${item.preview}
      data-source="${item.original}"
      alt=${item.description}
    />

    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
</li>`;
};

const createLIGallery = imageList.reduce(
  (acc, item) => (acc += createLi(item)),
  ""
);

gallery.insertAdjacentHTML("beforeend", createLIGallery);

gallery.addEventListener("click", e => {
  e.preventDefault(); //для того чтобы не перезагружать страницу
  if (e.target === e.currentTarget) {
    return;
  }
  handleClick(e);
});

closeButton.addEventListener("click", e => {
  if (e.target !== e.currentTarget) {
    return;
  }
  lightbox.classList.remove("is-open");
});

content.addEventListener("click", handleOverlayClick);

function handleOverlayClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  lightbox.classList.remove("is-open");
  window.removeEventListener("keydown", handleKeyPress);
}

function handleClick(e) {
  const { target } = event;
  e.preventDefault();
  lightbox.classList.add("is-open");
  window.addEventListener("keydown", handleKeyPress);
  imageModalWindow.alt = `${target.getAttribute("alt")}`;
  imageModalWindow.src = `${target.getAttribute("data-source")}`;
}

function handleKeyPress(e) {
  if (e.code !== "Escape") {
    return;
  }
  lightbox.classList.remove("is-open");
}
