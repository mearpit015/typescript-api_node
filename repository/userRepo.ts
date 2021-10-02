import { users } from "../coustomModule/models/users";

let db: Array<users> = [];


export const repoRegisterUser = (query: users) => {
    try {
        db.push(query);
        return query;
    }
    catch (e) {
        return `erorr`;
    }
}

export const repoGetAllUser = () => {
    try {
        return db.length > 0 ? db : [];
    }
    catch (e) {
        return `erorr`;
    }
}

