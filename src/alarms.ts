import { getMidnight } from "./utils/dates";
import { clearStorage, populateStorageWithData } from "./utils/storage";

const PERIOD_IN_MINUTES = 1440; // 24 hours in minutes

const createMidnightAlarm = async () => {
  const now = new Date();
  const midnight = getMidnight(now);

  await chrome.alarms.create("midnightAlarm", {
    when: midnight.getTime(), // Start at the next midnight
    periodInMinutes: PERIOD_IN_MINUTES,
  });
};

const onAlarm = async (alarm: chrome.alarms.Alarm) => {
  if (alarm.name === "midnightAlarm") {
    await clearStorage();
    await populateStorageWithData();
  }
};

createMidnightAlarm();
chrome.alarms.onAlarm.addListener(onAlarm);
