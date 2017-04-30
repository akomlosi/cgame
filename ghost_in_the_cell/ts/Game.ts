import Factory from "./Factory";
import Troop from "./Troop";
import Map from "./Map";
declare function printErr(command:any):any;

export default class Game {

	private _turn;
	private _round:number;
	private _graph;
	private _map:Map;

	constructor(graph, map:Map) {
		this._graph = graph;
		this._turn = {};
		this._map = map;
	}

	update(
		round: number,
		allFactories:{},
		myFactories:Array<Factory>,
		enemyFactories:Array<Factory>,
		myTroops:Array<Troop>,
		enemyTroops:Array<Troop>
	) {
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
		let distances = this._map.factoriesByDistance;
		let myFacs = this._turn[this._round].myFactories;
		let len = myFacs.length;
		let command = '';

		for (let i = 0; i < len; i++) {
			let source = myFacs[i];
			let target = this._getTarget(distances[source.id]);
			command += 'MOVE ' + source.id + ' ' + target + ' 1';
			if (i < len-1) {
				command += '; ';
			}
		}
		return command;
	}

	private _getTarget(s) {
		let allFactories = this._turn[this._round].allFactories;
		let i = 0;
		while (allFactories[s[i]].owner == 1) {
			i++;
		}
		return s[i];
	}
}