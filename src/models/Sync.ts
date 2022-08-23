import axios, { AxiosPromise} from "axios";

interface HasId{
  id:number
}


// ** This class is going to work only with USER CLASS
// Gneric type class
export class Sync <T extends HasId> {
  
  constructor(public rootUrl: string){}

  //* Returns a promise object
  //Fetch information from backend
  
  fetch(id:number): AxiosPromise{
    //Make arequest to our json server
    return axios.get(`${this.rootUrl}/${id}`);   
  }

  //Save information from user to the backend
  save(data: T): AxiosPromise {
    // if the object data has the id
    const {id} = data;

    if(id){
        //Put 
        return axios.put(`${this.rootUrl}/${id}`, data);
    }else{
        //Post
        return axios.post(this.rootUrl, data);
    }
  }


}