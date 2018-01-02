import { ICategory } from './category.interface';
import { uuid } from '../helpers/uuid';

export interface ITodo {
  name: string;
  completed: boolean;
  category: string | ICategory;
  createdAt: Date;
  updatedAt: Date;
  userId:string;
}