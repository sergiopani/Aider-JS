
//Describe the propieties that user is going to have
interface UserProps {
    name?:string;
    age?:number;
}

//Function with no arguents and no values
type Callback = () => void

export class User {
    events: {[key: string]: Callback[]} = {}
    //Data is private becaouse we don't want acces 
    constructor(private data: UserProps){}

    //return the propiety that is given in parameter
    get(propName: string): (number | string) {
        return this.data[propName];
    }

    //Change the data updating from the object in parameter
    set(update:UserProps):void{
        //Copy propieties of the first object to the second object
        Object.assign(this.data,update);

    }

    //when we change somthing on User we notify oter parts of our application
    //Eventing => 
    on(eventName: string, callback: Callback): void {
        //Store all the events and then trigger in the future
        //If event name already exists it assing an 
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }


}