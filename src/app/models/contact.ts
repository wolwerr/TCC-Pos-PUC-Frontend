export interface IContact {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IObjetctContact {
  content: IContact[];
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
