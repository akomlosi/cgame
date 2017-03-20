import Factory from "./Factory";
import Troop from "./Troop";

export default class State {

	private _troops: Array<Troop>;
	private _factories: Array<Factory>;
	private _cyborgs: number;

	constructor(troops: Array<Troop>, factories: Array<Factory>, cyborgs: number) {
		this._troops = troops;
		this._factories = factories;
		this._cyborgs = cyborgs;
	}

	get troops(): Array<Troop> {
		return this._troops;
	}

	get factories(): Array<Factory> {
		return this._factories;
	}

	get cyborgs(): number {
		return this._cyborgs;
	}

	get fitness(): number {
		let ownFactories = this._factories.filter((factory)=>{
			return factory.owner == 1;
		});
		let enemyFactories = this._factories.filter((factory)=>{
			return factory.owner == -1;
		});
		return ownFactories.length / this._factories.length;
	}
}