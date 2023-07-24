import { ElementStates } from "./element-states";

export type LinkedListData = {
  value: string;
  state: ElementStates;
  head?: string | null;
  tail?: string | null;
};
