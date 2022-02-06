import { City } from "./City";
import { User } from "./User";
import { EventType } from "./EventType";



export interface Event {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  uriImage: string;
  uriVideo: string;
  date: Date;
  eventTypeId: number;
  idcity: number;
  idUser: string;
  eventType?: EventType;
  city?: City;
  user?: User;
}
