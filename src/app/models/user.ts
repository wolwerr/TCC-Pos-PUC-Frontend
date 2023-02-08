export interface IUser {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface IObjetctUser {
  content: IUser[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageAble: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}
