import { OrthocalDayResponse, SaintsOfDayData } from "../types/saint";

const ORTHOCAL_API_BASE_URL = "https://orthocal.info/api/gregorian";
const ORTHOCAL_DETAILS_BASE_URL = "https://orthocal.info/readings/gregorian";

export const getLocalCalendarDate = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
});

export const getSaintsDetailsUrl = (date: Date) => {
  const { year, month, day } = getLocalCalendarDate(date);
  return `${ORTHOCAL_DETAILS_BASE_URL}/${year}/${month}/${day}/`;
};

export const normalizeSaintsOfDay = (
  payload: unknown,
  date: Date
): SaintsOfDayData | null => {
  const response = payload as Partial<OrthocalDayResponse>;

  if (!Array.isArray(response?.saints) || !response.saints.every((saint) => typeof saint === "string")) {
    return null;
  }

  const { year, month, day } = getLocalCalendarDate(date);

  return {
    date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    names: response.saints,
    detailsUrl: getSaintsDetailsUrl(date),
  };
};

export const fetchSaintsOfDay = async (
  date = new Date()
): Promise<SaintsOfDayData> => {
  const { year, month, day } = getLocalCalendarDate(date);
  const response = await fetch(`${ORTHOCAL_API_BASE_URL}/${year}/${month}/${day}/`);

  if (!response.ok) {
    throw new Error(`Orthocal request failed with status ${response.status}`);
  }

  const saints = normalizeSaintsOfDay(await response.json(), date);

  if (!saints) {
    throw new Error("Orthocal returned an invalid saints payload");
  }

  return saints;
};
