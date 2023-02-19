import { ITask } from './types';
import React from 'react';

export function filteredTasksByRoles(tasks: ITask[], role: string): ITask[] {
  if (role === 'ADMIN') {
    return tasks;
  } else {
    const filteredTask = tasks.filter((task) => {
      return task.assigned === role;
    });
    return filteredTask;
  }
}
