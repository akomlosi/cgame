declare function printErr(command:any):any;

export default class Factory {
	private _id: string;
	private _owner: number;
	private _cyborgs: number;
	private _produces: number;
	private _fitness: number;

	constructor(id, owner, cyborgs, produces) {
		this._id = id;
		this._owner = owner;
		this._cyborgs = cyborgs;
		this._produces = produces;
		this._fitness = 0;
	}

	get id(): string {
		return this._id;
	}
	get owner(): number {
		return this._owner;
	}
	get cyborgs(): number {
		return this._cyborgs;
	}
	get produces(): number {
		return this._produces;
	}

	get fitness():number {
		return this._fitness;
	}

	set setFitness(f:number) {
		this._fitness = f;
	}
}