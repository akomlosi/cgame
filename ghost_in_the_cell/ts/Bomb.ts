import Factory from "./Factory";
export default class Bomb {

	private _owner:number;
	private _source:Factory;
	private _target:any;
	private _turns:number;

	constructor(owner:number, source:Factory, target:any, turns:number) {
		this._owner = owner;
		this._source = source;
		this._target = target;
		this._turns = turns;
	}
}