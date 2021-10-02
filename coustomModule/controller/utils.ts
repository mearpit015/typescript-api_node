import { strictEqual } from "assert"

export class utils {

    constructor() { }

    public static printleangth = (value: string) => {
        return value.length;
    }
    
    public printReverse(val: string){
        let revrse : string = '';
       for (let index = val.length-1; index >= 0; index--) {
           revrse += val[index];
       }
        return revrse;
    }


}

