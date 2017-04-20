declare function printErr(command:any):any;

import {Grid, AStarFinder} from "pathfinding";

import Ship from "./Ship";
import Barrel from "./Barrel";
import CannonBall from "./CannonBall";
import Mine from "./Mine";
import Util from "./Util";
import Simulator from "./Simulator";

export default class Game {

	private _isMineAllowed:boolean;
	private _round:number;
	private _turn;
	//private _turn: {
	//	round: {
	//		ships: Array<Ship>,
	//		barrels: Array<Barrel>,
	//		cannonBalls:Array<CannonBall>,
	//		mines:Array<Mine>
	//	},
	//};
	private _grid;
	private _finder;
	private _paths;

	constructor() {
		this._isMineAllowed = true;
		this._paths = [];

		this._turn = {};

		this._turn[0] = {
			ships: [],
			barrels: [],
			mines: [],
			cannonBalls: []
		};

		this._grid = new Grid(23, 21);
		this._finder = new AStarFinder({
			allowDiagonal: true,
			//dontCrossCorners: false
		});
	}

	update(round) {
		this._paths = [];
		this._round = round;
		this._turn[round] = {
			ships: [],
			barrels: [],
			mines: [],
			cannonBalls: []
		};
	}

	get turn() {
		return this._turn[this._round];
	}

	set addShip(ship:Ship) {
		this.turn.ships.push(ship);
	}

	get ships() {
		return this.turn.ships;
	}

	set addBarrel(barrel:Barrel) {
		this.turn.barrels.push(barrel);
	}

	set addCannonBall(ball:CannonBall) {
		this.turn.cannonBalls.push(ball);
	}

	get cannonBalls() {
		return this.turn.cannonBalls;
	}

	set addMine(mine:Mine) {
		this._grid.setWalkableAt(mine.pos.x, mine.pos.y, false);
		this.turn.mines.push(mine);
	}

	get mines() {
		return this.turn.mines;
	}

	getCommand(shipIndex) {
		let myship = this.turn.ships.filter((ship)=> {
			return ship.owner == 1;
		});
		let enemyShip = this.turn.ships.filter((ship)=> {
			return ship.owner == 0;
		});

		//let i = shipIndex + 1

		//if (i == this.turn.ships.length/2) {
		//	let interceptor = myship[shipIndex];
		//	let dist = Simulator.countDistance(interceptor, Simulator.getClosestShip(interceptor, enemyShip));
		//	if (dist < 10) {
		//		let predictedPosition =
		//			Simulator.predictShipPosition(enemyShip[shipIndex], dist);
		//		return 'FIRE ' + predictedPosition.x + ' ' + predictedPosition.y;
		//	}
		//	return 'MOVE ' + enemyShip[shipIndex].pos.x + ' ' + enemyShip[shipIndex].pos.y;
		//}

		for (let i = 0; i < this.turn.barrels.length; i++) {
			var gridBackup = this._grid.clone();
			let p = this._finder.findPath(myship[shipIndex].pos.x, myship[shipIndex].pos.y, this.turn.barrels[i].pos.x, this.turn.barrels[i].pos.y, gridBackup);
			this._paths.push(p);
		}

		this._paths.sort((a, b)=> {
			return a.length > b.length;
		});

		//for (let c = 0; c < this.turn.cannonBalls.length; c++) {
		//	if (this.turn.cannonBalls[c].targetPos.x == myship[shipIndex].pos.x &&
		//		this.turn.cannonBalls[c].targetPos.y == myship[shipIndex].pos.y) {
		//		printErr('GEBASZ!!!!')
		//	}
		//}

		if (this._round % 2 == 0 && enemyShip[shipIndex]) {
			let dist = Simulator.countDistance(myship[shipIndex], enemyShip[shipIndex]);
			//if (dist < 10) {
			let predictedPosition =
				Simulator.predictShipPosition(enemyShip[shipIndex], dist);
			return 'FIRE ' + predictedPosition.x + ' ' + predictedPosition.y;
			//}
			//return 'MINE';
		}

		let ran = Math.random();
		if (this._paths[shipIndex] && enemyShip[shipIndex]) {
			if (myship[shipIndex].speed === 0) {
				return 'MOVE ' + enemyShip[shipIndex].pos.x + ' ' + enemyShip[shipIndex].pos.y;
			}
			let z = this._paths[shipIndex].length - 1;
			let p = this._paths[shipIndex][z][0] + ' ' + this._paths[shipIndex][z][1];
			this._paths.splice(shipIndex, 1);
			return 'MOVE ' + p;
		}
		if (enemyShip[shipIndex]) {
			return 'FIRE ' + enemyShip[shipIndex].pos.x + ' ' + enemyShip[shipIndex].pos.y;
		}
		return 'FIRE ' + enemyShip[0].pos.x + ' ' + enemyShip[0].pos.y;
	}
}