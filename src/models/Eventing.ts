//Class responsible to handler events from an user
//Function with no arguents and no values
type Callback = () => void

export class Eventing{

  events: {[key: string]: Callback[]} = {}
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

}