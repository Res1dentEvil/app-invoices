export interface IState {
  isAuth: boolean;
  isLoading: boolean;
  currentUser: IUser;
  error: string;
}

export interface IUser {
  email: string;
  password: string;
  avatar: string;
  files: [{}];
}
