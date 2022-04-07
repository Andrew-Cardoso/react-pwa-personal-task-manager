import Dexie, { Table } from 'dexie';
import { Task } from './models/task';

export class TaskManagementDatabase extends Dexie {
  tasks!: Table<Task>; 

  constructor() {
    super('taskManagementDatabase');
    this.version(2).stores({
      tasks: 'id, title, info, status, deadline, priority, dateCreated, dateStarted, dateFinished'
    });
  }
}

export const db = new TaskManagementDatabase();