import React from 'react';

import { ITask, PaymentStatus } from './types';
import { storeSlice } from '../store/reducers/StoreSlice';

export function filterTasksByRole(
  role: string,
  tasks: ITask[],
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
    const filteredTask = tasksList.filter((task: ITask) => {
      return task.assigned === role;
    });
    return filteredTask;
  }
}
