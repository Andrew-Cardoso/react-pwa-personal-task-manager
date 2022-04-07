import { Temporal } from "@js-temporal/polyfill";
import { Deadline } from "../../../data/models/deadline";

export const getDeadlineDate = (date: string, deadline: Deadline) => {
    const [deadlineValue, deadlineMeasure] = deadline.split(" ");
    const temporalDate = Temporal.PlainDateTime.from(date);
    const endDate = temporalDate.add({ [deadlineMeasure]: deadlineValue });
    return endDate;
}