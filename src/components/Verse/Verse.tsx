import { VerseData } from "../../types/verse";
import "./Verse.css";

type VerseProps = {
  data: VerseData | null;
};

const Verse = ({ data }: VerseProps) => {
  const cleanVerse = data?.verse.replace(/['"”]+/g, "").trim();

  return (
    <article className="verse">
      <h3 className="title">Verse of the Day ☦</h3>
      <p className="text-size-1 verse__text">"{cleanVerse}"</p>
      <p className="verse__ref">- {data?.ref}</p>
    </article>
  );
};

export default Verse;
