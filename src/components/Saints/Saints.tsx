import { SaintsOfDayData } from "../../types/saint";
import "./Saints.css";

type SaintsProps = {
  saintsData: SaintsOfDayData | null;
};

const Saints = ({ saintsData }: SaintsProps) => {
  return (
    <section className="saints" aria-labelledby="saints-heading">
      <h2 id="saints-heading" className="saints__heading">
        Saints of the Day <span aria-hidden="true">☦</span>
      </h2>
      {saintsData ? (
        <>
          {saintsData.names.length > 0 ? (
            <ul className="saints__list">
              {saintsData.names.map((saint, index) => (
                <li key={`${saint}-${index}`}>{saint}</li>
              ))}
            </ul>
          ) : (
            <p className="saints__unavailable">No commemorations are listed for today.</p>
          )}
          <a
            className="saints__link"
            href={saintsData.detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read their lives on Orthocal (opens in a new tab)"
          >
            Read their lives <span aria-hidden="true">↗</span>
          </a>
        </>
      ) : (
        <p className="saints__unavailable">Saints of the day are unavailable.</p>
      )}
    </section>
  );
};

export default Saints;
