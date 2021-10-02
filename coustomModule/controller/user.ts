import { use } from "chai";
import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { users } from '../models/users'
import { registerUser, getAllUser } from '../services/userService'

export class User {
    constructor() {
      }

    public addUser = (query: users) => {
        try {
            return registerUser(query);
        }
        catch (e) {
            return `api for User registeration`;
        }
    }

    public getUsers() {
        try {
            return getAllUser();
        }
        catch (e) {
            return `${e} |   api for get all users`;
        }
    }
}

