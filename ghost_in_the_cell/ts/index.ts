import Game from "./Game";
import Map from "./Map";
declare function readline():any;
declare function print(command:any):any;
declare function printErr(command:any):any;

import Dijkstra from './Dijkstra';


import Factory from './Factory';
import Troop from './Troop';
import Calculator from "./Calculator";
import Bomb from "./Bomb";

let graph:Dijkstra = new Dijkstra();
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
	graph.addVertex(factory1.toString(), routes[factory1]);
	graph.addVertex(factory2.toString(), routes[factory2]);
}

let map = new Map(routes);
let calc = new Calculator(routes);
let game = new Game(routes, graph, map, calc);

//printErr(JSON.stringify(routes));

let round = 0;

while (true) {
	let allFactories = {};
	let myFactories = [];
	let enemyFactories = [];
	let neutralFactories = [];

	let myTroops = [];
	let enemyTroops = [];

	let myBombs = [];
	let enemyBombs = [];

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
			let f = new Factory(entityId, arg1, arg2, arg3);
			allFactories[entityId] = f;
			if (arg1 == 1) {
				myFactories.push(f);
			}
			else if (arg1 == -1) {
				enemyFactories.push(f);
			}
			else {
				neutralFactories.push(f);
			}
		}
		else if (entityType == 'TROOP') {
			let t = new Troop(arg1, allFactories[arg2], allFactories[arg3], arg4, arg5);
			if (arg1 == 1) {
				myTroops.push(t);
			}
			else {
				enemyTroops.push(t);
			}
		}
		else if (entityType == 'BOMB') {
			if (arg1 == 1) {
				let b = new Bomb(arg1, allFactories[arg2], allFactories[arg3], arg4);
				myBombs.push(b);
			}
			else {
				let b = new Bomb(arg1, allFactories[arg2], arg3, arg4);
				enemyBombs.push(b);
			}
		}
	}

	game.update(round++, allFactories, myFactories, enemyFactories, myTroops, enemyTroops, myBombs, enemyBombs);

	print(game.command);
}