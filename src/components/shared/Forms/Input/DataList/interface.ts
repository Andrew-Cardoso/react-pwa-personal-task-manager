import { RefObject } from "react";
import { SelectOption } from "../interface";

export interface DataListProps {
  input: RefObject<HTMLInputElement>;
  onChange?: (value: string | number) => any,
  options: SelectOption[];
}