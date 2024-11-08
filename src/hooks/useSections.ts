import { useEffect, useState } from "react";
import { SectionData } from "../types/section";
import useChromeStorage from "./useChromeStorage";

const useSections = () => {
  const { data, setValue } = useChromeStorage<SectionData[]>("visibleSections");
  const [sections, setSections] = useState<SectionData[]>([]);

  const updateStorage = async (data: SectionData[] = sections) => {
    await setValue(data);
  };

  useEffect(() => {
    if (data) {
      setSections(data);
    }
  }, [data]);

  return { sections, setSections, updateStorage };
};

export default useSections;
