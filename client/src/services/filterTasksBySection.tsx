import React from 'react';

import { ITask, PaymentStatus } from './types';
import { storeSlice } from '../store/reducers/StoreSlice';

export function filterTasksBySection(
  section: string,
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

  if (section === 'all') {
    return tasksList;
  } else {
    const filteredTask = tasksList.filter((task: ITask) => {
      return task.section === section;
    });
    return filteredTask;
  }
}
