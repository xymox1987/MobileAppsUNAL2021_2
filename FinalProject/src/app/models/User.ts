import { DocumentType } from "./DocumentType";
import { City } from "./City";


export interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
  bornDate: Date;
  documentTypeId: number;
  documentNumber: string;
  phone: string;
  idCity: number;
  uriImage: string;
  enabled: boolean;
  password?: any;
  confirmedPassword?: any;
  city: City;
  documentType: DocumentType;
  role: string;
  token?: any;
}


