import { Temporal } from "@js-temporal/polyfill";
import { TIME_ZONE } from "./time-zone.const";

export const getDateNow = () => Temporal.Now.plainDateTimeISO(TIME_ZONE);