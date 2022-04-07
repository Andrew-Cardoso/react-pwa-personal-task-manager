import { Task } from "../../../../data/models/task";

export interface ResultProps {
    onClose: (task?: Task) => any
    task?: Task;
}