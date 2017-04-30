declare function printErr(command:any):any;

export default class Factory {
	private _id: string;
	private _owner: number;
	private _cyborgs: number;
	private _produces: number;
	private _fitness: number;
	private _threat: number;

	constructor(id, owner, cyborgs, produces) {
		this._id = id;
		this._owner = owner;
		this._cyborgs = cyborgs;
		this._produces = produces;
		this._fitness = ((produces * cyborgs) * 0.5) + 1;
		this._threat = 0;
	}

	get id(): string {
		return this._id;
	}
	get owner(): number {
		return this._owner;
	}
	set updateOwner(owner: number) {
		this._owner = owner;
	}
	get cyborgs(): number {
		return this._cyborgs;
	}
	set addCyborgs(cyborgs: number) {
		this._cyborgs += cyborgs;
	}
	set killCyborgs(cyborgs: number) {
		this._cyborgs -= cyborgs;
	}
	get produces(): number {
		return this._produces;
	}

	get fitness(): number {
		this._fitness = ((this._produces * this._cyborgs) * 0.5) + 1/* - this._threat*/;
		return this._fitness;
	}

	set threat(threat: number) {
		this._threat = threat;
	}
}