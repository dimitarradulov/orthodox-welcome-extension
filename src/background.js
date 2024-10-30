import "./alarms";
import { populateStorageWithData } from "./utils/storage";

chrome.runtime.onInstalled.addListener(async () => {
  await populateStorageWithData();
});
