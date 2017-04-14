/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


// game loop
while (true) {
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
	}
	for (var i = 0; i < myShipCount; i++) {

		// Write an action using print()
		// To debug: printErr('Debug messages...');

		print('MOVE 11 10'); // Any valid action, such as "WAIT" or "MOVE x y"
	}
}