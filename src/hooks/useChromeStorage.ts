import { useState, useEffect } from "react";

const useChromeStorage = <T>(name: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chrome.storage.local.get(name);
        setData(result[name]);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchData();
  }, [name]);

  return { data, error };
};

export default useChromeStorage;
