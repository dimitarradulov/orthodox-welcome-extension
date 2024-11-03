import { useState, useEffect } from "react";
import useChromeStorage from "./useChromeStorage";
import { VerseData } from "../types/verse";

const useVerseData = () => {
  const { data, error } = useChromeStorage<VerseData>("verse");
  const [verseData, setVerseData] = useState<VerseData | null>(null);

  useEffect(() => {
    if (data) {
      setVerseData(data);
    }

    if (error) {
      fetch(
        "https://orthodoxwelcome.s3.eu-north-1.amazonaws.com/data/fallback-verses.json"
      )
        .then((response) => response.json())
        .then((fallbackData) => {
          setVerseData(fallbackData);
        })
        .catch((fetchError) => {
          console.error("Error fetching fallback verse:", fetchError);
        });
    }
  }, [data, error]);

  return { verseData };
};

export default useVerseData;
