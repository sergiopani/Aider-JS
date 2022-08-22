import axios, { AxiosResponse } from "axios";

//Describe the propieties that user is going to have
interface UserProps {
    id?: number;
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

    trigger(eventName: string): void {
        //Check if we already have some events with this event name
        const handlers = this.events[eventName];

        //If handelers is undefined or thre is no handelers
        if(!handlers || handlers.length === 0){
            return;
        }

        //iterate throught the handelers array and exacute the callback
        handlers.forEach(callback => { 
            callback();
        })
    }

    //Fetch information from backend
    fetch(): void{
        //Make arequest to our json server
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
        .then((response: AxiosResponse): void => {
            this.set(response.data);
        })
    }
    //Save information from user to the backend
    save(): void {
        const id = this.get('id');
        if(id){
            //Put 
            axios.put(`http://localhost:3000/users/${id}`, this.data);
        }else{
            //Post
            axios.post('http://localhost:3000/users', this.data);
        }
    }

}