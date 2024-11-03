import { useEffect } from "react";
import useChromeStorage from "./useChromeStorage";

const useBackgroundImage = () => {
  const { data } = useChromeStorage<string>("imageUrl");

  useEffect(() => {
    document.body.style.background = `url(${
      data ?? "../assets/images/fallback-background.jpg"
    }) no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
  }, [data]);

  return data;
};

export default useBackgroundImage;
