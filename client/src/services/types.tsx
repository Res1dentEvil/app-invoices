export interface IState {
  isAuth: boolean;
  isLoading: boolean;
  currentUser: IUser;
  taskList: ITask[];
  taskListBySection: ITask[];
  currentTask: ITask;
  error: string;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  roles: string[];
  avatar?: string;
  // files?: [{}];
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
  articleImage: File;
  section: string;
  dateStart: string;
  dateUpdate: string;
  dateEnd: string;
  priority: string;
  whoCheckedList: string[];
  completed: string;
}

export enum ManagerPositions {
  ProcurementControl = 'Центр контролю закупок',
  GeneralDirector = 'Виконавчий директор',
  ChiefAccountant = 'Головний бухгалтер',
  DirectorAnimalHusbandry = 'Директор по тваринництву',
  ChiefEngineer = 'Головний інженер',
}

export enum PaymentStatus {
  WAITING = 'Очікування',
  PAID = 'Оплачено',
  CANCELED = 'Відхилено',
}
