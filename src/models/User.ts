import { Eventing } from './Eventing'
import { Sync } from './Sync';
import { Attributes } from './Attributes';
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
    public sync: Sync<UserProps> = new Sync(localhost); 
    public attributes: Attributes<UserProps>;

    constructor(attrs: UserProps){
        this.attributes = new Attributes<UserProps>(attrs)
    }

}