import Factory from "./Factory";
export default class Calculator {
	private _routes;
	constructor(routes) {
		this._routes = routes;
	}

	getStrongestFactory(f:Array<Factory>):Factory {
		let selected = f.sort((f1, f2)=>{
			if (f1.cyborgs < f2.cyborgs && f1.produces < f2.produces) {
				return -1;
			}
			else if (f1.cyborgs < f2.cyborgs) {
				return 0;
			}
			else {
				return 1;
			}
		});
		return selected[0];
	}

	getFactoryRatio(my:Array<Factory>, enemy:Array<Factory>) {
		return my.length / enemy.length;
	}

	calculateFitness(factory:Factory, distance:number) {
		return (factory.cyborgs) * (factory.produces * 2) / distance;
	}

	getFactoriesOrderedByFitness(refFactory:Factory, f) {
		let list = [];
		for (let i in f) {
			let fitness = this.calculateFitness(f[i], this._routes[refFactory.id][f[i].id]);
			f[i].setFitness = fitness;
			list.push(f[i]);
		}
		list.sort((f1, f2)=>{
			if (f1.fitness > f2.fitness) {
				return -1;
			}
			else if (f1.fitness == f2.fitness) {
				return 0;
			}
			else {
				return 1;
			}
		});
		return list;
	}

	getClosestBestNeutralFactory(allFactories:{}, factoriesAroundMine):Factory {
		let list = [];
		for (let y = 0; y < factoriesAroundMine.length; y++) {
			let id = factoriesAroundMine[y];
			let f = allFactories[id];
			if (f.owner == 0 && f.produces > 0) {
				list.push(f);
			}
		}
		return list[0];
	}
}