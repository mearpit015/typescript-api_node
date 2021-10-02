import { users } from "../models/users";
import {repoRegisterUser, repoGetAllUser} from "../../repository/userRepo"

export const registerUser = (query: users) =>{
  return  repoRegisterUser(query);
}

export const getAllUser = () =>{
    return  repoGetAllUser();
  }