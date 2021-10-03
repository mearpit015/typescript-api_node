import http, { Server, IncomingMessage, ServerResponse } from 'http'
import os from 'os';
import { utils } from './coustomModule/controller/utils';
import { apiRouter } from './router/apiRouter';
import querystring from 'querystring'
import express from 'express';
import { User } from './coustomModule/controller/user';
import { modifyBlobTemplete } from './coustomModule/controller/ReadJson';


const hostname: string = '127.0.0.1';
const port: number = 5000;

var app = express();

// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.post('/registeruser', function(req, res){
    
    var result = userController().addUser(req.body);
    console.dir(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(`${JSON.stringify(result)} sucessfully added!`);
}); 

app.get('/getAllUser', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var result = userController().getUsers();
    console.dir(req.body);
    res.send(`${JSON.stringify(result)}`);
}); 

app.get('/getTemplate', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
res.send(`${modifyBlobTemplete()}`);

})

///controller instance create
function userController() {
    return new User();
}

app.listen(port);


// const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');

//     apiRouter.mapRouts(req, res); //routing optimized.
    
//     // let url: string | undefined = req.url;
//     // let method: string | undefined = req.method;
//     // let result : string = "";
//     // if(url === '/' && method === 'GET'){
//     //  result = `<h4>${utils.printleangth("Arpit")} || revrse: ${new utils().printReverse("Arpit")}</h4>`;
//     // }
//     // res.end(`${result}`);

//     //os module
//     //  let osData = {
//     //      freeMemory : os.freemem(),
//     //      totalMemory: os.totalmem(),    
//     //      homedir: os.homedir()
//     //  }


//     //   res.end(`${JSON.stringify(osData)}`);
// });


// server.listen(port, hostname, () => {
//     console.log(`node js server is started http://${hostname}:${port}`);
// })
