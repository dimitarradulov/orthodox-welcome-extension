import { getRandomElement } from "./functional";
import { getRandomImageUrl } from "./images";
import { BIBLE_VERSES } from "../constants/verses";
import { DEFAULT_VISIBLE_SECTIONS } from "../constants/sections";
import { SectionData } from "../types/section";
import { fetchSaintsOfDay } from "./saints";

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

const setVisibleSections = async () => {
  try {
    const result = await chrome.storage.local.get("visibleSections");
    const existingSections = Array.isArray(result.visibleSections)
      ? result.visibleSections
      : [];
    const existingById = new Map(
      existingSections
        .filter(
          (section): section is SectionData =>
            typeof section?.id === "string" &&
            typeof section.visible === "boolean"
        )
        .map((section) => [section.id, section])
    );
    const visibleSections = DEFAULT_VISIBLE_SECTIONS.map((section) => ({
      ...section,
      visible: existingById.get(section.id)?.visible ?? section.visible,
    }));

    await chrome.storage.local.set({
      visibleSections,
    });
  } catch (error) {
    throw error;
  }
};

const setSaints = async () => {
  const saints = await fetchSaintsOfDay();
  await chrome.storage.local.set({ saints });
};

export const clearStorage = async () => {
  await chrome.storage.local.clear();
};

export const populateStorageWithData = async () => {
  const tasks = [setImageUrl(), setVerse(), setVisibleSections(), setSaints()];
  const results = await Promise.allSettled(tasks);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error(result.reason);
    }
  });
  // await setPrayer();
};

export const getStorageData = async (name: string) => {
  try {
    return chrome.storage.local.get(name);
  } catch (error) {
    throw error;
  }
};
