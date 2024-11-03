import { useState, useEffect } from "react";
import { Time } from "../types/time";

const useTime = (): Time => {
  const [time, setTime] = useState<Time>({
    hour: new Date().getHours().toString().padStart(2, "0"),
    minutes: new Date().getMinutes().toString().padStart(2, "0"),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setTime({
        hour: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0"),
      });
    }, 60000); // Update every minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return time;
};

export default useTime;
