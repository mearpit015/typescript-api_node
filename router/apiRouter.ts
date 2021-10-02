import { IncomingMessage, ServerResponse } from "http";
import { utils } from "../coustomModule/controller/utils";
import {User} from "../coustomModule/controller/user";
export class apiRouter {

    public static mapRouts(req: IncomingMessage, res: ServerResponse) {
        let url: string | undefined = req.url;
        let method: string | undefined = req.method;
        let result: string = "";

        const typeGet: string = 'GET';
        const typePost: string = 'POST';
        const notFound: string = 'Page not found!'

        if (url === '/' && method === typeGet) {
            result = `<h4>${utils.printleangth("Arpit")} || revrse: ${new utils().printReverse("Arpit")}</h4>`;
        }
        else if (url === '/registeruser' && method === typePost) {
        }

        res.end(`${result}`);
    }
}