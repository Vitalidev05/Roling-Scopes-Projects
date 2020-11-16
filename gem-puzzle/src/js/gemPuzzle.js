export default class gemPuzzle {
	constructor(size = 4, keySize = 75) {
		//init variables
		this.gameKeys = [];
		this.counter = 0;
		this.keySize = keySize;
		this.random = [];
		this.size = size;
		this.gameArray = [];
		this.sound;
		this.empty;
		this.popup;
		this.newGame;
		this.moves;
		this.time;
		//fill gameArray
		this.fillArray(this.gameArray);
	}
 
	//fill array with numbers from 1 to size^2
	fillArray(arr) {
		for(let i = 1; i < this.size ** 2; i++) {
			arr.push(i);
		}
	} 
 }