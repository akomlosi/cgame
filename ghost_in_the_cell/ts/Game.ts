import Factory from "./Factory";
import Troop from "./Troop";
import Map from "./Map";
import Calculator from "./Calculator";
import Bomb from "./Bomb";
declare function printErr(command:any):any;

export default class Game {

	private _routes:{};
	private _turn;
	private _round:number;
	private _graph;
	private _map:Map;
	private _bombs:number;
	private _calc:Calculator;
	private _increased:boolean;

	constructor(routes:{}, graph, map:Map, calc:Calculator) {
		this._routes = routes;
		this._graph = graph;
		this._turn = {};
		this._map = map;
		this._bombs = 1;
		this._calc = calc;
		this._increased = false;
	}

	update(round:number,
		   allFactories:{},
		   myFactories:Array<Factory>,
		   enemyFactories:Array<Factory>,
		   myTroops:Array<Troop>,
		   enemyTroops:Array<Troop>,
		   myBombs:Array<Bomb>,
		   enemyBombs:Array<Bomb>) {
		this._round = round;
		this._turn[round] = {
			allFactories,
			myFactories,
			enemyFactories,
			myTroops,
			enemyTroops,
			myBombs,
			enemyBombs
		}
	}

	get command():string {
		return this._getCommand();
	}

	private _getCommand():string {
		let turn = this._turn[this._round];
		let allFactories = turn.allFactories;
		let distances = this._map.factoriesByDistance;
		let myFacs = turn.myFactories;
		let enemyFacs = turn.enemyFactories;
		let len = myFacs.length;
		let command = 'WAIT';
		let factoryRatio = this._calc.getFactoryRatio(myFacs, enemyFacs);

		if (enemyFacs.length === 0 || myFacs.length == 0) {
			//printErr('WAIT HErE')
			return 'WAIT';
		}

		for (let w in allFactories) {
			if (myFacs[0].id !== allFactories[w].id) {
				let dist = this._routes[myFacs[0].id][allFactories[w].id]
			}
		}

		if (myFacs.length == 1) {
			if (myFacs[0].produces == 0 && !this._increased) {
				this._increased = true;
				return 'INC ' + myFacs[0].id;
			}
			else if (this._increased) {
				this._increased = false;
				return 'WAIT';
			}
			else if (myFacs[0].produces >= 1) {
				// save the cyborgs
				let saveHouse = this._calc.getClosestBestNeutralFactory(allFactories, distances[myFacs[0].id]);
				if (saveHouse) {
					return 'MOVE ' + myFacs[0].id + ' ' + saveHouse.id + ' ' + myFacs[0].cyborgs;
				}
			}
		}

		if (this._bombs > 0) {
			if (factoryRatio <= 1) {

				let sourceFactory = this._calc.getStrongestFactory(myFacs);
				let targetFactory = this._calc.getStrongestFactory(enemyFacs);
				//printErr('SEND BOMB: '+ sourceFactory.id)
				this._bombs--;
				return 'BOMB ' + sourceFactory.id + ' ' + targetFactory.id;
			}
		}

		if (myFacs.length == 1 && enemyFacs.length == 1) {
			printErr('DESTROYING!')
			return 'MOVE ' + myFacs[0].id + ' ' + enemyFacs[0].id + ' ' + 3;
		}

		for (let i = 0; i < len; i++) {
			let source = myFacs[i];
			let targets = distances[source.id].filter((f)=> {
				if (allFactories[f].owner != 1) return f;
			});
			distances[source.id].sort((f1, f2)=> {
				if (f1.owner > f2.owner) {
					return -1;
				}
				else {
					return 1;
				}
			});
			for (let t = 0; t < myFacs.length; t++) {
				let cyborgs = source.cyborgs -1;
				if (source.cyborgs > 2) {
					if (targets[t]) {
						if (command.length) {
							command += ';MOVE ' + source.id + ' ' + targets[t] + ' ' + cyborgs;
						}
						else {
							command += 'MOVE ' + source.id + ' ' + targets[t] + ' ' + cyborgs;
						}
					}
				}
			}
		}
		return command;
	}
}