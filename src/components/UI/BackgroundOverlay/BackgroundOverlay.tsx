import "./BackgroundOverlay.css";
import { createPortal } from "react-dom";

type OverlayProps = {
  backgroundImageUrl: string | null;
};

const BackgroundOverlay = ({ backgroundImageUrl }: OverlayProps) => {
  return (
    <>
      {backgroundImageUrl &&
        createPortal(<div className="overlay"></div>, document.body)}
    </>
  );
};
export default BackgroundOverlay;
