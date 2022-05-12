import { City } from './City';
import { User } from './User';



export interface Farming {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  idcity: number;
  idUser: string;
  city?: City;
  user?: User;
}
