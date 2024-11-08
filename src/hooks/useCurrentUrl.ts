import { useState, useEffect } from "react";

const useCurrentUrl = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentUrl(tabs[0].url!);
    });
  }, []);

  return currentUrl;
};

export default useCurrentUrl;
