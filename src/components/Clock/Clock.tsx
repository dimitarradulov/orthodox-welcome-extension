import "./Clock.css";
import { Time } from "../../types/time";

const Clock = ({ hour, minutes }: Time) => {
  return (
    <time className="clock select-none">
      {hour}:{minutes}
    </time>
  );
};

export default Clock;
