import { useEffect } from "react";
import "./App.css";
import BackgroundOverlay from "./components/UI/BackgroundOverlay/BackgroundOverlay";
import useBackgroundImage from "./hooks/useBackgroundImage";
import useTime from "./hooks/useTime";
import useVerseData from "./hooks/useVerseData";
import useSections from "./hooks/useSections";
import Section from "./components/Section/Section";

const App = () => {
  const { hour, minutes } = useTime();
  const { verseData } = useVerseData();
  const { sections, setSections } = useSections();
  const backgroundImageUrl = useBackgroundImage();

  const visibleSections = sections
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.sections) {
        const updatedSections = message.sections;
        setSections(updatedSections);
      }
      return true;
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <main className="extension">
      <BackgroundOverlay backgroundImageUrl={backgroundImageUrl} />
      {visibleSections.map((section) => (
        <Section
          key={section.id}
          data={section}
          hour={hour}
          minutes={minutes}
          verseData={verseData}
        />
      ))}
    </main>
  );
};

export default App;
