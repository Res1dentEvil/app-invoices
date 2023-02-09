export interface IState {
  isAuth: boolean;
  isLoading: boolean;
  currentUser: IUser;
  tasksList: ITask[];
  currentTask: ITask;
  error: string;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  avatar?: string;
  files?: [{}];
}

export interface IAuthBody {
  email: string;
  password: string;
}
export interface ITask {
  counter?: number;
  _id?: string;
  owner: string;
  description: string;
  assigned: string;
  // articleImage: string;
  articleImage: File;
  section: string;
  dateStart: string;
  dateUpdate: string;
  priority: string;
  whoCheckedList: string[];
  completed: boolean;
}
