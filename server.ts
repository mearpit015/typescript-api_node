import http, { Server, IncomingMessage, ServerResponse } from 'http'
import os from 'os';
import { utils } from './coustomModule/controller/utils';
import { apiRouter } from './router/apiRouter';
import querystring from 'querystring'

const hostname: string = '127.0.0.1';
const port: number = 5000;

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    apiRouter.mapRouts(req, res); //routing optimized.
    
    // let url: string | undefined = req.url;
    // let method: string | undefined = req.method;
    // let result : string = "";
    // if(url === '/' && method === 'GET'){
    //  result = `<h4>${utils.printleangth("Arpit")} || revrse: ${new utils().printReverse("Arpit")}</h4>`;
    // }
    // res.end(`${result}`);

    //os module
    //  let osData = {
    //      freeMemory : os.freemem(),
    //      totalMemory: os.totalmem(),    
    //      homedir: os.homedir()
    //  }


    //   res.end(`${JSON.stringify(osData)}`);
});


server.listen(port, hostname, () => {
    console.log(`node js server is started http://${hostname}:${port}`);
})
