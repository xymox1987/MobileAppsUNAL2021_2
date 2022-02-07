import { User } from "./User";



export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  idUser: string;
  uriImage: string;
  user?: User;
}
