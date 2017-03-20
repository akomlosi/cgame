declare function readline():any;
declare function print(command:any):any;
declare function printErr(command:any):any;


import Population from './Population';
import Factory from './Factory';
import Troop from './Troop';
import State from './State';
import Simulator from './Simulator';

let routes = {};
var factoryCount = parseInt(readline()); // the number of factories
var linkCount = parseInt(readline()); // the number of links between factories
for (var i = 0; i < linkCount; i++) {
	var inputs = readline().split(' ');
	var factory1 = parseInt(inputs[0]);
	var factory2 = parseInt(inputs[1]);
	var distance = parseInt(inputs[2]);
	if (!routes[factory1]) {
		routes[factory1] = {};
	}
	if (!routes[factory2]) {
		routes[factory2] = {};
	}
	routes[factory1][factory2] = distance;
	routes[factory2][factory1] = distance;
}


while (true) {
	let factories = [];
	let troops = [];
	let cyborgs = 0;
	var entityCount = parseInt(readline()); // the number of entities (e.g. factories and troops)

	for (var i = 0; i < entityCount; i++) {
		var inputs = readline().split(' ');
		var entityId = parseInt(inputs[0]);
		var entityType = inputs[1];
		var arg1 = parseInt(inputs[2]); // player that owns the factory: 1 for you, -1 for your opponent and 0 if neutral
		var arg2 = parseInt(inputs[3]); // number of cyborgs in the factory
		var arg3 = parseInt(inputs[4]); // factory production (between 0 and 3)
		var arg4 = parseInt(inputs[5]);
		var arg5 = parseInt(inputs[6]);
		if (entityType == 'FACTORY') {
			if (arg1 == 1) {
				cyborgs += arg2;
			}
			factories.push(new Factory(entityId, arg1, arg2, arg3));
		}
		else if (entityType == 'TROOP') {
			if (arg1 == 1) {
				cyborgs += arg4;
			}
			factories.filter((factory)=> {
				return factory.id == arg2;
			});
			troops.push(
				new Troop(
					arg1,
					factories.filter((factory)=> {
						if (factory.id == arg2) return factory;
					})[0],
					factories.filter((factory)=> {
						if (factory.id == arg3) return factory;
					})[0], arg4, arg5));
		}
	}

	let state = new State(troops, factories, cyborgs);
	let population = new Population(state, routes, 10);
	for (let i = 0; i < 10; i++) {
		population.evolve();
	}

	print(population.population[0].command);
}