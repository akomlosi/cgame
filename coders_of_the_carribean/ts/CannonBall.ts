export default class CannonBall {
	private _x:number;
	private _y:number;
	private _owner:number;
	private _turnsLeft:number;

	constructor(x:number, y:number, owner:number, turnsLeft:number) {
		this._x = x;
		this._y = y;
		this._owner = owner;
		this._turnsLeft = turnsLeft;
	}

	get targetPos() {
		return {
			x: this._x,
			y: this._y
		}
	}

	get owner() {
		return this._owner;
	}

	get turnsLeft() {
		return this._turnsLeft;
	}
}