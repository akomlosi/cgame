import State from './State';
import Factory from "./Factory";
import Gene from "./Gene";

export default class Simulator {

	private _state:State;
	private _gene:Gene;

	constructor(state, gene, future) {
		this._state = state;
		this._gene = gene;

		this.simulate(gene, future);
	}

	private simulate(gene:Gene, future:number):void {
		let troops = this._state.troops;
		// update producers
		for (let f = 0; f < this._state.factories.length; f++) {
			let fac = this._state.factories[f];
			fac.addCyborgs = fac.produces * future;
		}

		for (let t = 0; t < troops.length; t++) {
			let troop = troops[t];
			// Arrived
			if (troop.turns <= future) {
				if (troop.target.owner == 1) {
					troop.target.addCyborgs = troop.cyborgs;
				} else {
					troop.target.killCyborgs = troop.cyborgs;
				}
			}
		}
		// arrived
		if (gene.moving && gene.turns <= future) {
			if (gene.targetFactory.owner == 1) {
				gene.targetFactory.addCyborgs = gene.cyborgsToSend;
			} else {
				gene.targetFactory.killCyborgs = gene.cyborgsToSend;
			}
		}
	}

	get state():State {
		return this._state;
	}

}