import "./alarms";
import { populateStorageWithData } from "./utils/storage";

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install" || reason === "update") {
    await populateStorageWithData();
  }
});
