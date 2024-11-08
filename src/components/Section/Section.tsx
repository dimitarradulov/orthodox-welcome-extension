import { createElement } from "react";
import { SectionData } from "../../types/section";
import Clock from "../Clock/Clock";
import Verse from "../Verse/Verse";

type SectionProps = {
  data: SectionData;
  [key: string]: any;
};

const Section = ({ data, ...args }: SectionProps) => {
  const componentsMap: { [key: string]: React.ComponentType<any> } = {
    clock: Clock,
    verse: Verse,
  };
  const Component = componentsMap[data.id];

  let section;

  if (Component) {
    section = createElement(Component, { ...args });
  }

  return (
    <>
      {data.id !== "clock" && <h3 className="title">{data.title} ☦</h3>}
      {section}
    </>
  );
};

export default Section;
