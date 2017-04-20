import Ship from "./Ship";
import Game from "./Game";
import Barrel from "./Barrel";
import CannonBall from "./CannonBall";
import Mine from "./Mine";
declare function readline():any;
declare function print(command:any):any;
declare function printErr(command:any):any;

let round = 1;

const game = new Game();
// game loop
while (true) {

	game.update(round);

	var myShipCount = parseInt(readline()); // the number of remaining ships
	var entityCount = parseInt(readline()); // the number of entities (e.g. ships, mines or cannonballs)
	for (var i = 0; i < entityCount; i++) {
		var inputs = readline().split(' ');
		var entityId = parseInt(inputs[0]);
		var entityType = inputs[1];
		var x = parseInt(inputs[2]);
		var y = parseInt(inputs[3]);
		var arg1 = parseInt(inputs[4]);
		var arg2 = parseInt(inputs[5]);
		var arg3 = parseInt(inputs[6]);
		var arg4 = parseInt(inputs[7]);

		if (entityType === 'SHIP') {
			let ship = new Ship(entityId, arg1, arg2, arg3, arg4, x, y);
			game.addShip = ship;
		}
		else if (entityType === 'BARREL') {
			let barrel = new Barrel(x, y);
			game.addBarrel = barrel;
		}
		else if (entityType === 'CANNONBALL') {
			let cannonball = new CannonBall(x, y, arg1, arg2);
			game.addCannonBall = cannonball;
		}
		else if (entityType === 'MINE') {
			let mine = new Mine(x, y);
			game.addMine = mine;
		}

	}
	for (var i = 0; i < myShipCount; i++) {
		print(game.getCommand(i));
	}

	round++;

}