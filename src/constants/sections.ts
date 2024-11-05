import { Section } from "../types/section";

export const DEFAULT_VISIBLE_SECTIONS: ReadonlyArray<Section> = [
  { order: 1, id: "clock", title: "Clock", visible: true },
  { order: 2, id: "verse", title: "Verse of the Day", visible: true },
];
