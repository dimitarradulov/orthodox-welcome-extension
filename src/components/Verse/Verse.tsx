import { VerseData } from "../../types/verse";
import "./Verse.css";

type VerseProps = {
  verseData: VerseData | null;
};

const Verse = ({ verseData }: VerseProps) => {
  const cleanVerse = verseData?.verse.replace(/['"”“]+/g, "").trim();

  return (
    <article className="verse">
      <p className="text-size-1 verse__text">"{cleanVerse}"</p>
      <p className="verse__ref">- {verseData?.ref}</p>
    </article>
  );
};

export default Verse;
