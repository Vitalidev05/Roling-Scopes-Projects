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
	//add DOM to page
	init () {
		//init variables
		this.sound = document.createElement('button');
		this.update = document.createElement("div");
		const wrapper = document.createElement("div");
		const nav = document.createElement("nav");
		const button = document.createElement("button");
		const listButton = document.createElement('button');
		const rating = document.createElement('div');
		const container = document.createElement("div");
		const gamefield = document.createElement("section");
		
		//add classes  
		this.sound.classList.add('sound');
		this.sound.classList.add('on');
		this.sound.classList.add('button'); 
		this.update.classList.add("update");
	
		rating.classList.add("rating");
		rating.classList.add("up-up");    
		nav.classList.add("nav");
		wrapper.classList.add("wrapper");
		button.classList.add("new-game");
		button.classList.add("button");   
		container.classList.add("container");
		gamefield.classList.add("gamefield");
		
	}
 }