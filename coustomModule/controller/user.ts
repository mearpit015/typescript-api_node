import { IncomingMessage, ServerResponse } from "http";
import { users } from '../models/users'
import {registerUser, getAllUser} from '../services/userService'
import userService from '../../repository/userRepo'

export default class User {
    // private _data=[];
    // constructor(req: IncomingMessage, res: ServerResponse) {
    //    //we need to parse header herer 

    // }
    constructor() {
     
    }

    public registerUser = (query: users) => {
        try {
           return registerUser;
        }
        catch (e) {
            return `api for User registeration`;
        }
    }

    public getAllUser() {
        try {
            return getAllUser;
        }
        catch (e) {
            return `${e} |   api for get all users`;
        }
    }
}

