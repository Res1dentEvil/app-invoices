export interface IState {
  isAuth: boolean;
  isLoading: boolean;
  currentUser: IUser;
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
  owner: string;
  description: string;
  // articleImage: string;
  articleImage: File;
  section: string;
  dateStart: string;
  dateEnd: string | null;
  priority: string;
  whoCheckedList: string[];
  completed: boolean;
}
