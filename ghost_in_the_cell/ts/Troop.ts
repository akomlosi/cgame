import Factory from "./Factory";
export default class Troop {

	private _owner: number;
	private _source: Factory;
	private _target: Factory;
	private _cyborgs: number;
	private _turns: number;

	constructor(owner:number, source: Factory, target: Factory, cyborgs: number, turns: number) {
		this._owner = owner;
		this._source = source;
		this._target = target;
		this._cyborgs = cyborgs;
		this._turns = turns;
	}

	get owner(): number {
		return this._owner
	}
	get source(): Factory {
		return this._source;
	}
	get target(): Factory {
		return this._target;
	}
	get cyborgs(): number {
		return this._cyborgs;
	}
	get turns(): number {
		return this._turns;
	}
}