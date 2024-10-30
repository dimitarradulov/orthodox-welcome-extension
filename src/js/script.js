"use strict";

import { getStorageData } from "../utils/storage";

const clockEl = document.querySelector("[data-selector='clock']");
const verseContainerEl = document.querySelector(
  "[data-selector='verse-container']"
);
const verseTextEl = document.querySelector("[data-selector='verse-text']");
const verseRefEl = document.querySelector("[data-selector='verse-ref']");

const setBackgroundImage = (imageUrl) => {
  document.body.style.background = `url(${imageUrl}) no-repeat center center fixed`;
  document.body.style.backgroundSize = "cover";
};

const createOverlay = () => {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
  overlay.style.zIndex = -1;

  document.body.appendChild(overlay);
};

const updateClock = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  clockEl.innerText = `${hours}:${minutes}`;
};

const activateClock = () => {
  setInterval(updateClock, 1000);
  updateClock();
};

const addVerse = (data) => {
  if (verseContainerEl.classList.contains("hidden")) {
    verseContainerEl.classList.remove("hidden");
  }

  verseTextEl.innerText = `${data.text}`;
  verseRefEl.innerText = `- ${data.ref}`;
};

getStorageData("imageUrl")
  .then(({ imageUrl }) => {
    setBackgroundImage(imageUrl ?? "../images/fallback-background.jpg");
    createOverlay();
    activateClock();
  })
  .catch((error) => {
    console.error(error);
    setBackgroundImage("../images/fallback-background.jpg");
  });

getStorageData("verse")
  .then(({ verse }) => addVerse(verse))
  .catch((error) => {
    console.error(error);
    fetch("../data/fallback-verse.json")
      .then((response) => response.json())
      .then((data) => addVerse(data))
      .catch(console.error);
  });
