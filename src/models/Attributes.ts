
export class Attributes<T>{
	//Data is private becaouse we don't want acces 
	constructor(
		private data: T,
	) { }

	//return the propiety that is given in parameter
	//Constrain -> K can only be one of the types of T
	get = <K extends keyof T>(key: K): T[K] => {
		return this.data[key];
	};

	//Change the data updating from the object in parameter
	set(update: T): void {
		//Copy propieties of the first object to the second object
		Object.assign(this.data, update);
	}


}

