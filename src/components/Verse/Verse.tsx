import { VerseData } from "../../types/verse";
import "./Verse.css";

type VerseProps = {
  data: VerseData | null;
};

const Verse = ({ data }: VerseProps) => {
  return (
    <article className="verse">
      <h3 className="title">Verse of the Day ☦</h3>
      <p className="text-size-1 verse__text">"{data?.verse}"</p>
      <p className="verse__ref">- {data?.ref}</p>
    </article>
  );
};

export default Verse;
