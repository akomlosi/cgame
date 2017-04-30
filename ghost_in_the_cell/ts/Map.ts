declare function printErr(command:any):any;
export default class Map {

	private _routes;
	private _orderedList;

	constructor(routes:{}) {
		this._routes = routes;
		this._orderedList = {};
		this._setDistanceOrder();
	}

	private _setDistanceOrder() {
		let counter = 0, closest = 10000;
		for (let i in this._routes) {
			let r = this._routes[i];
			if (!this._orderedList[counter]) {
				this._orderedList[counter] = [];
			}
			for (let j in r) {
				this._orderedList[counter].push([j, r[j]])
			}
			counter++;
		}

		for (let k in this._orderedList) {
			this._orderedList[k].sort((a,b)=>{
				return a[1] > b[1];
			});
			this._orderedList[k].filter((a)=>{
				a.splice(1, 1);
				return ;
			});
			this._orderedList[k] = this.flatten(this._orderedList[k]);
		}
		printErr(JSON.stringify(this._orderedList));

	}

	private flatten = arr => arr.reduce(
		(acc, val) => acc.concat(
			Array.isArray(val) ? this.flatten(val) : val
		),
		[]
	)

	get factoriesByDistance() {
		return this._orderedList;
	}
}