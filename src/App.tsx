import "./App.css";
import Clock from "./components/Clock/Clock";
import BackgroundOverlay from "./components/UI/BackgroundOverlay/BackgroundOverlay";
import Verse from "./components/Verse/Verse";
import useBackgroundImage from "./hooks/useBackgroundImage";
import useTime from "./hooks/useTime";
import useVerseData from "./hooks/useVerseData";

const App = () => {
  const { hour, minutes } = useTime();
  const { verseData } = useVerseData();
  const backgroundImageUrl = useBackgroundImage();

  return (
    <main className="extension">
      <BackgroundOverlay backgroundImageUrl={backgroundImageUrl} />
      <Clock hour={hour} minutes={minutes} />
      <Verse data={verseData} />
    </main>
  );
};

export default App;
