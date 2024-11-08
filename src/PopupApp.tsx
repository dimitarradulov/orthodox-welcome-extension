import { useEffect } from "react";
import "./PopupApp.css";
import SectionCheckboxList from "./components/SectionCheckboxList/SectionCheckboxList";
import useCurrentUrl from "./hooks/useCurrentUrl";
import useSections from "./hooks/useSections";

const PopupApp = () => {
  const { sections, setSections, updateStorage } = useSections();
  const currentUrl = useCurrentUrl();

  const isNewTabPage = currentUrl?.startsWith("chrome://newtab");

  useEffect(() => {
    chrome.runtime.sendMessage({ sections: sections });
  }, [sections]);

  const handleCheckboxChange = (id: string, value: boolean) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) =>
        section.id === id ? { ...section, visible: value } : section
      );
      updateStorage(updatedSections);
      return updatedSections;
    });
  };

  return (
    <main className="popup">
      {isNewTabPage ? (
        <>
          <h4 className="no-wrap popup__title">Visible Sections</h4>
          <SectionCheckboxList
            sections={sections}
            handleCheckboxChange={handleCheckboxChange}
          />
        </>
      ) : (
        <p className="no-wrap">
          This extension only works on the New Tab page.
        </p>
      )}
    </main>
  );
};

export default PopupApp;
