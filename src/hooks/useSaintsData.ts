import useChromeStorage from "./useChromeStorage";
import { SaintsOfDayData } from "../types/saint";

const useSaintsData = () => {
  const { data: saintsData } = useChromeStorage<SaintsOfDayData>("saints");

  return { saintsData };
};

export default useSaintsData;
