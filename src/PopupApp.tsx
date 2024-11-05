import { useEffect, useState } from "react";
import "./PopupApp.css";
import useChromeStorage from "./hooks/useChromeStorage";
import { Section } from "./types/section";
import SectionCheckboxList from "./components/SectionCheckboxList/SectionCheckboxList";

const PopupApp = () => {
  const { data } = useChromeStorage<Section[]>("visibleSections");
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (data) {
      setSections(data);
    }
  }, [data]);

  const handleCheckboxChange = (id: string, value: boolean) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, visible: value } : section
      )
    );
  };

  return (
    <main className="popup">
      <h4 className="popup__title">Visible Sections</h4>
      <SectionCheckboxList
        sections={sections}
        handleCheckboxChange={handleCheckboxChange}
      />
    </main>
  );
};

export default PopupApp;
