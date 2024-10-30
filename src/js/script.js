"use strict";

import { getStorageData } from "../utils/storage";

const extensionEl = document.querySelector("#extension");

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

const createClock = () => {
  const clock = document.createElement("div");
  clock.id = "clock";

  extensionEl.appendChild(clock);
};

const updateClock = () => {
  const clock = document.querySelector("#clock");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`;
};

const activateClock = () => {
  createClock();
  setInterval(updateClock, 1000);
  updateClock();
};

getStorageData("imageUrl")
  .then(({ imageUrl }) => {
    if (imageUrl) {
      setBackgroundImage(imageUrl);
    }
    createOverlay();
    activateClock();
  })
  .catch(console.error);

getStorageData("verse")
  .then(({ verse }) => {
    const verseContainer = document.createElement("div");
    const verseTitle = document.createElement("h3");
    const verseText = document.createElement("p");
    const verseRef = document.createElement("p");

    verseTitle.innerText = "Verse of the Day ☦";
    verseText.innerText = `${verse.text}`;
    verseRef.innerText = `- ${verse.ref}`;

    verseTitle.style.fontSize = "4rem";
    verseTitle.style.marginBlockEnd = "1.5rem";
    verseText.style.fontSize = "2.5rem";
    verseRef.style.textAlign = "right";
    verseRef.style.fontSize = "2rem";
    verseRef.style.fontStyle = "italic";

    verseContainer.appendChild(verseTitle);
    verseContainer.appendChild(verseText);
    verseContainer.appendChild(verseRef);

    extensionEl.appendChild(verseContainer);
  })
  .catch(console.error);
