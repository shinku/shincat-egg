const { v4: uuidv4 } = require('uuid');
class appstores {

    constructor(){
        
    }
    static  generateNumber(name){
        let number = uuidv4();
        //console.log({name});
        //number = "eac95b71-1aca-4b4d-ac03-268309a98c32";
        if(!appstores.numbers){
            appstores.numbers = new Set();
        }
        number = number.substring(0,6);
        appstores.numbers.add({name,number});
        //console.log(appstores.numbers);
        return number;
    }
    static getNumberList(){
        
        return Array.from(appstores.numbers || []);
    }
    static removeFromGroup(number){
        let {numbers} = appstores;
        let status = false;
        if(!numbers) return false;
       
        for(let _item of numbers){
            if(_item.number == number){
                numbers.delete(_item);
                status = true;
            }
        }
        return status;
    }
}

module.exports = appstores;