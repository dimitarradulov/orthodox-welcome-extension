import React from "react";
import CustomCheckbox from "../UI/CustomCheckbox/CustomCheckbox";
import { SectionData } from "../../types/section";

type SectionCheckboxListProps = {
  sections: SectionData[];
  handleCheckboxChange: (id: string, value: boolean) => void;
};

const SectionCheckboxList: React.FC<SectionCheckboxListProps> = ({
  sections,
  handleCheckboxChange,
}) => {
  return (
    <>
      {sections.map((section) => (
        <CustomCheckbox
          key={section.id}
          label={section.title}
          checked={section.visible}
          onChange={(value) => handleCheckboxChange(section.id, value)}
        />
      ))}
    </>
  );
};

export default SectionCheckboxList;
