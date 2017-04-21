declare function printErr(command:any):any;
import Ship from "./Ship";
const Simulator = {
	predictShipPosition(ship:Ship, future:number) {
        if (ship.speed == 0) {
            return {x: ship.pos.x, y: ship.pos.y};
        }
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

    getPredictedDistance(ship1:Ship, ship2:Ship) {
        return Math.round(1 + (Simulator.countDistance(ship1, ship2) / 3));
    },

	// countDistance(ship1:Ship, ship2:Ship) {
	// 	let d = Math.floor((Math.abs(ship1.pos.x - ship2.pos.x) + Math.abs(ship1.pos.y - ship2.pos.y)) / 2);
	// 	printErr('DISTANCE: '+d)
	// 	return d;
	// },

	countDistance(ship1:Ship, ship2:Ship) {
        if (ship1.pos.x == ship2.pos.x) {
            return Math.abs(ship2.pos.y - ship1.pos.y);
        }
        else if (ship1.pos.y == ship2.pos.y) {
            return Math.abs(ship2.pos.x - ship1.pos.x);
        }
        else {
            var dx = Math.abs(ship2.pos.x - ship1.pos.x);
            var dy = Math.abs(ship2.pos.y - ship1.pos.y);
            if (ship1.pos.y < ship2.pos.y) {
                return dx + dy - Math.ceil(dx / 2);
            }
            else {
                return dx + dy - Math.floor(dx / 2);
            }
        }
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
	},

    getEscapeCoordinates(ship) {
        let x = ship.pos.x;
        let y = ship.pos.y;
        let escapeX = x - 8 <= 0 ? x + 8 : x - 8;
        let escapeY = y - 8 <= 0 ? y + 8 : y - 8;
        return {x : escapeX, y : escapeY};
    }
};
export default Simulator;
