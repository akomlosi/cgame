import State from './State';
import Gene from './Gene';
import Simulator from "./Simulator";
declare function printErr(command:any):any;

export default class Population {

	private _state:State;
	private _population:Array<Gene>;
	private _matingPool:Array<Gene>;
	private _populationCount: number;
	private _routes;

	constructor(state:State, routes, populationCount:number) {
		this._state = state;
		this._population = [];
		this._matingPool = [];
		this._routes = routes;
		this._populationCount = populationCount;
	}

	public evolve():void {

		for (let i = 0; i < this._populationCount; i++) {
			let gene = new Gene(this._state.factories, this._state.cyborgs, this._routes);
			gene.setFitness = new Simulator(this._state, gene, 5).state.fitness;
			this._population.push(gene);
		}

		// Selection
		this._matingPool = [];
		for (let j = 0; j < this._population.length; j++) {
			let n = Math.floor(this._population[j].fitness * 100);
			for (let y = 0; y < n; y++) {
				this._matingPool.push(this._population[j]);
			}
		}

		// Reproduction
		for (let k = 0; k < this._population.length; k++) {
			let a = Math.floor(Math.random() * this._matingPool.length -1);
			let b = Math.floor(Math.random() * this._matingPool.length -1);

			//let parentA:Gene = this._matingPool[a];
			let parentA:Gene = this._matingPool[2];
			let parentB:Gene = this._matingPool[b];

			let child:Gene = parentA.crossover(parentB);
			child.mutate(0.01);
			this._population[k] = child;
		}
	}

	get population():Array<Gene> {
		return this._population;
	}


}