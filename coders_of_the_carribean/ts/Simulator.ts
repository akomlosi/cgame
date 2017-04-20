declare function printErr(command:any):any;
import Ship from "./Ship";
const Simulator = {
	predictShipPosition(ship:Ship, future:number) {
		switch (ship.rotation) {
			case 0:
				return {x: ship.pos.x + future, y: ship.pos.y};
			case 1:
				return {x: ship.pos.x + future, y: ship.pos.y - future};
			case 2:
				return {x: ship.pos.x - future, y: ship.pos.y - future};
			case 3:
				return {x: ship.pos.x - future, y: ship.pos.y};
			case 4:
				return {x: ship.pos.x - future, y: ship.pos.y + future};
			case 5:
				return {x: ship.pos.x + future, y: ship.pos.y + future};
		}
	},

	countDistance(ship1:Ship, ship2:Ship) {
		let d = Math.floor((Math.abs(ship1.pos.x - ship2.pos.x) + Math.abs(ship1.pos.y - ship2.pos.y)) / 2);
		printErr('DISTANCE: '+d)
		return d;
	},

	getClosestShip(own, enemies) {
		let closest = null, dist = 1000, d2;
		for (let i = 0; i < enemies.length; i++) {
			d2 = Simulator.countDistance(own, enemies[i]);
			if (d2 < dist) {
				dist = d2;
				closest = enemies[i];
			}
		}
		return closest;
	}
};
export default Simulator;
