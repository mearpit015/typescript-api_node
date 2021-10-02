import { utils } from "../coustomModule/controller/utils";
import {expect} from 'chai'

describe('utils', ()=>{
   it('reverse', () => {
    let ut =  new utils();
    
    expect(ut.printReverse('arpits')).to.equals('stipr');
   })
})