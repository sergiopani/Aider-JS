import { Eventing } from './Eventing'
import { Sync } from './Sync';

//Describe the propieties that user is going to have
export interface UserProps {
    id?: number;
    name?:string;
    age?:number;
}

const localhost = 'http://localhost:3000/users'

export class User {   
    //Use our eventing class with composition
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync();

    //Data is private becaouse we don't want acces 
    constructor(
        private data: UserProps,
        ){}

    //return the propiety that is given in parameter
    get(propName: string): (number | string) {
        return this.data[propName];
    }

    //Change the data updating from the object in parameter
    set(update:UserProps):void{
        //Copy propieties of the first object to the second object
        Object.assign(this.data,update);
    }

    
    

}