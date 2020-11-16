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
		
		//add innerHTML 
		listButton.innerHTML = "<img src='/src/assets/images/list-ol-solid.svg' class='top_list'></img>";
		listButton.classList.add("button");
		button.innerText = "New Game";
	
		this.sound.innerHTML = `<i class="material-icons">volume_down</i>`;
		this.update.innerHTML = `
			<span class="time">Time: 00:00:00</span>
			<span class="moves">Moves: ${this.counter}</span>
			`;
		
		//add sound
		const soundElement = document.createElement('div');
		soundElement.classList.add('sound-play');
		soundElement.classList.add('hidden');
		soundElement.innerHTML = `<audio class="audio" src="/src/assets/sounds/sound.mp3"></audio>`;  
		
		//add popup on gameOver
		const gameOver = document.createElement('div');
		gameOver.classList.add('popup');
		gameOver.classList.add('up-up');
		gameOver.innerHTML = `<span>Congratulations! You won!</span>
			<p class="time-count">Time: 00:00:00</p>
			<p class="moves-count">Moves: 0</p>
		`;
	
		//delete popup on click to button
		const btnAccept = document.createElement('button');
		btnAccept.classList.add('accept');
		btnAccept.classList.add('button');
		btnAccept.innerText = 'Ok';
		gameOver.appendChild(btnAccept);
		
		//apend child 
		container.appendChild(this.update);
		container.appendChild(gamefield);
	
		nav.appendChild(listButton);
		nav.appendChild(button);
		nav.appendChild(this.sound);    
	
		wrapper.appendChild(gameOver);
		wrapper.appendChild(rating);
		wrapper.appendChild(soundElement);
		wrapper.appendChild(nav);
		wrapper.appendChild(container);
		
		//add DOM elements to the page
		document.body.appendChild(wrapper);
	
		//init variables
		this.newGame = document.querySelector(".new-game");
		this.popup = document.querySelector('.popup');
	
		//add DOM  gamefield
		this.createGameField();
	}
 
	//init gamefield
	createGameField () {
		//init variables
		this.gamefield = document.querySelector('.gamefield');    
	
		//copy gameArray array to keysLayout
		this.keysLayout =  this.gameArray.slice();
		this.keysLayout.push('')
		
		//add DOM elemnets to the page
		for (let i = 0; i <  this.size ** 2; i++) {
			//init div element
			let key = document.createElement("div");
	
			//add classes
			key.className = 'key';
			key.classList.add(`key__${i + 1}`);
			key.innerHTML = this.keysLayout[i];
	
			//init coordinates
			let top = 0;
			let left = 0;
	
	}
	}
 }