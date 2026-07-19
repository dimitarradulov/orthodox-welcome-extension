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
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes[name]) {
        setData(changes[name].newValue as T);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [name]);

  const setValue = async (value: T) => {
    try {
      await chrome.storage.local.set({ [name]: value });
      setData(value);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { data, error, setValue };
};

export default useChromeStorage;
