import { User } from "./User";



export interface Friend {
  id: number;
  idPrincipalUser: string;
  idFriendUser: string;
  userfriend: User;
}
