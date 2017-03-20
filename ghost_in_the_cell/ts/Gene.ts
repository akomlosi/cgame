import Factory from "./Factory";
declare function printErr(command:any):any;

export default class Gene {

	private _isMoving:boolean;
	private _routes:Object;
	private _factories:Array<Factory>;
	private _cyborgsCount:number;
	private _cyborgsToSend:number;
	private _sourceFactory:Factory;
	private _targetFactory:Factory;
	private _turns:number;
	private _fitness:number;
	public commandGene:Array<any>;

	constructor(factories, cyborgsCount, routes) {
		this.commandGene = [];
		this._isMoving = false;
		this._routes = routes;
		this._factories = factories;
		this._cyborgsCount = cyborgsCount;
		this._getRandomCommand();
	}

	get command():string {
		if (this.commandGene.length == 0) {
			return 'WAIT';
		}
		let res = 'MOVE ';
		for (let i = 0; i < this.commandGene.length; i++) {
			if (this.commandGene[i] instanceof Factory) {
				res += this.commandGene[i].id + ' ';
			}
			else {
				res += this.commandGene[i];
			}
		}
		return res;
	}

	private _getRandomCommand() {
		this._cyborgsToSend = this._getRandom(this._cyborgsCount);

		let sf:Array<Factory> = this._factories.filter((f)=> {
			return f.owner == 1;
		});

		if (!sf.length) { return false; }

		if (sf.length == 1) {
			this._sourceFactory = sf[0];
		}
		else {
			do {
				this._sourceFactory = this._factories[this._getRandom(this._factories.length) - 1];
			} while (this._sourceFactory.owner !== 1);
		}

		let tf:Array<Factory> = this._factories.filter((f)=> {
			return f.owner !== 1;
		});

		if (!tf.length) { return false; }

		if (tf.length == 1) {
			this._targetFactory = tf[0];
		} else {
			do {
				this._targetFactory = this._factories[this._getRandom(this._factories.length) - 1];
			} while (this._targetFactory === this._sourceFactory);
		}

		this._turns = this._routes[this._sourceFactory.id][this._targetFactory.id];
		this._isMoving = true;
		this.commandGene.push(this._sourceFactory, this._targetFactory, this._cyborgsToSend);
		this._isMoving = false;
	}

	private _getRandom(ran) {
		return Math.floor(Math.random() * ran) + 1;
	}

	get moving():boolean {
		return this._isMoving;
	}

	get cyborgsToSend():number {
		return this._cyborgsToSend;
	}

	get sourceFactory():Factory {
		return this._sourceFactory;
	}

	get targetFactory():Factory {
		return this._targetFactory;
	}

	get turns():number {
		return this._turns;
	}

	set setFitness(f:number) {
		this._fitness = f;
	}

	get fitness():number {
		return this._fitness;
	}

	public crossover(partner:Gene):Gene {
		let child = new Gene(this._factories, this._cyborgsCount, this._routes);
		if (this._isMoving && child.moving) {
			let midpoint = Math.floor(Math.random() * this.commandGene.length);
			for (let i = 0; i < this.commandGene.length; i++) {
				if (i > midpoint) {
					child.commandGene[i] = this.commandGene[i]
				} else {
					child.commandGene[i] = partner.commandGene[i]
				}
			}
		}
		return child;
	}

	public mutate(rate:number):void {
		if (Math.random() < rate) {
			let ran = Math.floor(Math.random() * this.commandGene.length);
			let ran2;
			if (ran === 0) { // source factory
				do {
					ran2 = this._factories[this._getRandom(this._factories.length) - 1];
				} while (this._sourceFactory.owner !== 1);
			}
			else if (ran == 1) { // target
				do {
					ran2 = this._factories[this._getRandom(this._factories.length) - 1];
				} while (this.commandGene[1] === ran2);
			}
			else {
				ran2 = this._getRandom(this._cyborgsCount);
			}

			this.commandGene[ran] = ran2;
		}

	}
}