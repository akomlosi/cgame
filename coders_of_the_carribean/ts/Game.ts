declare function printErr(command:any):any;

//import {Grid, AStarFinder} from "pathfinding";

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
	//private _grid;
	//private _finder;
	//private _paths;

	constructor() {
		//this._isMineAllowed = true;
		//this._paths = [];

		this._turn = {};

		this._turn[0] = {
			ships: [],
			barrels: [],
			mines: [],
			cannonBalls: []
		};

		//this._grid = new Grid(23, 21);
		//this._finder = new AStarFinder({
		//	allowDiagonal: true,
		//	//dontCrossCorners: false
		//});
	}

	update(round) {
		//this._paths = [];
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
		//this._grid.setWalkableAt(mine.pos.x, mine.pos.y, false);
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

		//for (let i = 0; i < this.turn.barrels.length; i++) {
		//	var gridBackup = this._grid.clone();
		//	let p = this._finder.findPath(myship[shipIndex].pos.x, myship[shipIndex].pos.y, this.turn.barrels[i].pos.x, this.turn.barrels[i].pos.y, gridBackup);
		//	this._paths.push(p);
		//}

		let myShip = myship[shipIndex];
		let target = Simulator.getClosestShip(myship[shipIndex], enemyShip);

		//this._paths.sort((a, b)=> {
		//	return a.length > b.length;
		//});


		for (let c = 0; c < this.turn.cannonBalls.length; c++) {
			if (this.turn.cannonBalls[c].targetPos.x == myship[shipIndex].pos.x &&
				this.turn.cannonBalls[c].targetPos.y == myship[shipIndex].pos.y) {
				printErr('GEBASZ!!!!')
				if (this._round % 2 == 0) {
					return 'FASTER';
				} else {
					return 'PORT';
				}
				//let pos = Simulator.getEscapeFromCannonBall(this.turn.cannonBalls[c]);
				//return 'MOVE ' + pos.x + ' ' + pos.y;
			}
		}

		if (this._round % 2 == 0 && target) {
			let dist = Simulator.getPredictedDistance(myShip, target);
			printErr('Fire DIST: ' + dist);
			if (dist < 10) {
				let predictedPosition =
					Simulator.predictShipPosition(target, dist);
				return 'FIRE ' + Math.abs(predictedPosition.x) + ' ' + Math.abs(predictedPosition.y);
			}
			else {
				return 'FASTER'
			}
			//return 'MINE';
		}

		if (this.turn.barrels.length) {
			let barrel = Simulator.getClosestBarrel(myShip, this.turn.barrels);
			return 'MOVE ' + barrel.pos.x + ' ' + barrel.pos.y;
		}

		//if (this._paths[shipIndex]) {
		//	if (myShip.speed === 0) {
		//		return 'MOVE ' + target.pos.x + ' ' + target.pos.y;
		//	}
		//	let z = this._paths[shipIndex].length - 1;
		//	let p = this._paths[shipIndex][z][0] + ' ' + this._paths[shipIndex][z][1];
		//	this._paths.splice(shipIndex, 1);
		//	return 'MOVE ' + p;
		//}
		//if (target) {
		//	return 'FIRE ' + target.pos.x + ' ' + target.pos.y;
		//}
		if (this._round % 2 !== 0) {
			let escapeTo = Simulator.getEscapeCoordinates(target);
			printErr('ESCAPE')
			return 'MOVE ' + escapeTo.x + ' ' + escapeTo.y;
		}
		//return 'FIRE ' + target.pos.x + ' ' + target.pos.y;
	}
}