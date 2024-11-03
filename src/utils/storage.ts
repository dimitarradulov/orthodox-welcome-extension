import { getRandomElement } from "./functional";
import { getRandomImageUrl } from "./images";
import { BIBLE_VERSES } from "../constants/verses";

const setImageUrl = async () => {
  try {
    const url = getRandomImageUrl();

    await chrome.storage.local.set({
      imageUrl: url,
    });
  } catch (error) {
    throw error;
  }
};

const setVerse = async () => {
  try {
    const verse = getRandomElement(BIBLE_VERSES);
    const response = await fetch(`https://bible-api.com/${verse}`);
    const data = await response.json();

    await chrome.storage.local.set({
      verse: { ref: data.reference, verse: data.text },
    });
  } catch (error) {
    throw error;
  }
};

const setPrayer = async () => {
  try {
    const response = await fetch(
      "https://orthodoxwelcome.s3.eu-north-1.amazonaws.com/data/prayers.json"
    );
    const data = await response.json();
    const randomPrayer = getRandomElement(data.orthodox_prayers);

    await chrome.storage.local.set({
      prayer: randomPrayer,
    });
  } catch (error) {
    throw error;
  }
};

export const clearStorage = async () => {
  await chrome.storage.local.clear();
};

export const populateStorageWithData = async () => {
  try {
    await setImageUrl();
    await setVerse();
    await setPrayer();
  } catch (error) {
    console.error(error);
  }
};

export const getStorageData = async (name: string) => {
  try {
    return chrome.storage.local.get(name);
  } catch (error) {
    throw error;
  }
};
