import Factory from "./Factory";
import Troop from "./Troop";
import Map from "./Map";
declare function printErr(command:any):any;

export default class Game {

	private _turn;
	private _round:number;
	private _graph;
	private _map:Map;
	private _bombs:number;

	constructor(graph, map:Map) {
		this._graph = graph;
		this._turn = {};
		this._map = map;
		this._bombs = 2;
	}

	update(round:number,
		   allFactories:{},
		   myFactories:Array<Factory>,
		   enemyFactories:Array<Factory>,
		   myTroops:Array<Troop>,
		   enemyTroops:Array<Troop>) {
		this._round = round;
		this._turn[round] = {
			allFactories,
			myFactories,
			enemyFactories,
			myTroops,
			enemyTroops
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
		let len = myFacs.length;
		let command = '';

		if (this._bombs > 0) {
			this._bombs--;
			command += 'BOMB ' + myFacs[0].id + ' ' + turn.enemyFactories[0].id + '; ';
		}

		if (turn.enemyFactories.length === 0) {
			return 'WAIT';
		}

		for (let i = 0; i < len; i++) {
			let source = myFacs[i];
			let targets = distances[source.id].filter((f)=> {
				if (allFactories[f].owner != 1) return f;
			});
			for (let t = 0; t < targets.length; t++) {
				let cyborgs = allFactories[targets[t]].cyborgs + 1;
				if (source.cyborgs <= 1) {
					command = 'WAIT';
				}
				else {
					command += 'MOVE ' + source.id + ' ' + targets[t] + ' ' + cyborgs;
				}
				if (t < targets.length - 1) {
					command += '; ';
				}
			}
			if (i < len - 1 && targets.length > 0) {
				command += '; ';
			}
		}
		return command;
	}
}