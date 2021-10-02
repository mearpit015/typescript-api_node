import { users } from "../coustomModule/models/users";
import {repoRegisterUser, repoGetAllUser} from "../repository/userRepo"

export const registerUser = (query: users) =>{
  return  repoRegisterUser(query);
}

export const getAllUser = () =>{
    return  repoGetAllUser();
  }