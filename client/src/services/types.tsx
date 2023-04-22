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

export interface IFileCloudinary {
  fieldname: string;
  filename: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
}

export interface ITask {
  counter?: number;
  _id?: string;
  owner: string;
  description: string;
  assigned: string;
  fileLink: File;
  section: string;
  dateStart: string;
  dateUpdate: string;
  dateEnd: string;
  priority: string;
  whoCheckedList: string[];
  completed: string;
  fileCloudinary: IFileCloudinary;
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
