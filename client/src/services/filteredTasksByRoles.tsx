import React from 'react';

import { ITask, PaymentStatus } from './types';

export function filteredTasksByRoles(
  tasks: ITask[],
  role: string,
  showUncompletedTasks: boolean,
  showCompletedTasks: boolean
): ITask[] {
  let tasksList = tasks;

  if (showUncompletedTasks) {
    tasksList = tasks.filter((task) => {
      return task.completed === PaymentStatus.WAITING;
    });
  }
  if (showCompletedTasks) {
    tasksList = tasks.filter((task) => {
      return task.completed === PaymentStatus.PAID || task.completed === PaymentStatus.CANCELED;
    });
  }

  if (role === 'ADMIN') {
    return tasksList;
  } else {
    const filteredTask = tasksList.filter((task) => {
      return task.assigned === role;
    });
    return filteredTask;
  }
}
