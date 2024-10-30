import { getRandomImageUrl } from "./images";

export const clearStorage = async () => {
  await chrome.storage.local.clear();
};

export const populateStorageWithData = async () => {
  const imageUrl = getRandomImageUrl();

  try {
    await chrome.storage.local.set({
      imageUrl,
    });

    const response = await fetch("https://bible-api.com/?random=verse");
    const data = await response.json();

    await chrome.storage.local.set({
      verse: { ref: data.reference, text: data.text },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getStorageData = async (name) => {
  try {
    return chrome.storage.local.get(name);
  } catch (error) {
    throw error;
  }
};
