import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAtributes<T> {
    set(update: T): void;
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(enventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}
interface HasId {
    id?: number;
}

export class Model<T extends HasId>{

    constructor(
        private attributes: ModelAtributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) { };
    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;



    set(update: T): void {
        //Call atribute method of set
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch(): void {

        const id = this.attributes.get('id');

        //If id actually dont exists
        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without an id!');
        }

        this.sync.fetch(id).then((response: AxiosResponse) => {
            //Set the information
            this.set(response.data);
        });

    }

    //Save all the propieties of the current user
    save(): void {
        //Inform the application that the 
        this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse) => {
                this.trigger('save');
            })
            .catch(() => {
                this.trigger('error');
            });
    }

}