const util = {
	getDistance : (a, b) => {

		return (Math.abs(a.pos.x - b.pos.x) + Math.abs(a.pos.y - b.pos.y))
	}

};

export default util;
