export default class Ship {

	private _id:number;
	private _rotation:number;
	private _speed:number;
	private _stock:number;
	private _owner:number;
	private _x:number;
	private _y:number;

	constructor(id:number, rotation:number, speed:number, stock:number, owner:number, x:number, y:number) {
		this._id = id;
		this._rotation = rotation;
		this._speed = speed;
		this._stock = stock;
		this._owner = owner;
		this._x = x;
		this._y = y;
	}

	get owner() {
		return this._owner;
	}

	get speed() {
		return this._speed;
	}
	get pos() {
		return {
			x: this._x,
			y: this._y
		}
	}

	get stock() {
		return this._stock;
	}

	get rotation() {
		return this._rotation;
	}
}