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
	
			//create key grid
			if (i <= this.size - 1) {
				top = 0;
				left = i *  this.keySize;
			} else if (i > this.size - 1 && i <= this.size * 2 - 1) {
				top =  this.keySize;
				left = (i -  this.size) *  this.keySize;
			} else if (i > this.size * 2 - 1 && i <= this.size * 3 - 1) {
				top = (this.size - 2) *  this.keySize;
				left = (i - this.size * 2) *  this.keySize;
			} else {
				top = (this.size - 1) *  this.keySize;
				left = (i - this.size * 3) *  this.keySize;
		}
			
			//move and animation of buttons happening due to change coordinates
			key.style.left = `${left}px`;
			key.style.top = `${top}px`;
		
			//add empty key
			if (i ===  this.size ** 2 - 1) {
				key.classList.add('empty');
			}
	
			//append key to gamefield 
			this.gamefield.append(key);
		
			//update gamekeys
			this.gameKeys.push({
				id: i,
				top: top,
				left: left,
				key: key,
			})
		}
	}
 
	//update time per 1 sec
	updateTime() {
		let hour = this.time.getHours(),
		min = this.time.getMinutes(),
		sec = this.time.getSeconds();	
		
		const timeElement = document.querySelector('.time'); 
		timeElement.innerHTML = `Time: ${this.addZero(hour)}<span>:</span>${this.addZero(min)}<span>:</span>${this.addZero(sec)}`;
		this.time.setSeconds(sec + 1);
		setTimeout(() => this.updateTime(this.time), 1000);
	}
 
	//add zero in time if it needed
	addZero(n) {
		return (parseInt(n, 10) < 10 ? '0' : '') + n;
	}
 
 
 //to start new game
	startNewGame () {
		//discharge current time
		this.time = new Date();
		this.time.setHours(0);
		this.time.setMinutes(0);
		this.time.setSeconds(0);
		
		//shuffle if it is solvable
		
		//get array with random numbers
		this.random = this.gameArray.sort(() => Math.random() - 0.5);
	
		//sum in row shuld be even to solve this layout
		let sum = 0;
		let row = this.empty.top / this.keySize + 1;
	
		for (let i = 0; i < this.random.length; i++) {
				let k = i + 1;
				while (k < this.random.length) {
				if (this.random[k] < this.random[i]) {
					sum += 1;
				}
				k++;
				}
			
		}
		sum = sum + row;
		//if sum is not even game is not solvable 
		if (sum % 2 !== 0) { 
			this.startNewGame();
		}
	
		//else if it solvable  create new gameLayout and discharge counter
		this.newGameLayout();
		this.dischargeCounter();
	}
 
	//create new Layout
	newGameLayout () {    
		//create new Dom elements
		for (let i = 0; i < this.random.length; i++) {
			let cell = this.gameKeys[i];  
			cell.key.innerHTML = `${this.random[i]}`;
			cell.key.classList.add('key');
			cell.key.classList.add(`key__${this.random[i]}`);
			cell.id = this.random[i] - 1;
		}
	}
 
	//to play sound
	playSound () {
		const audio = document.querySelector('.audio');
		if (!audio) return;
		audio.currentTime = 0;
		audio.play();
	}
 
 
	//to start counter
	count () {
		this.counter++;
		this.moves.innerHTML = `Moves: ${this.counter}`;
	}
 
	//to discharge Counter
	dischargeCounter () {
		this.counter = 0;
		this.moves.innerHTML = `Moves: ${this.counter}`;
	}
 
	//fill rating table with values from localStorage
	fillRating() {  
		//delete old table if needed
		let topTable = document.querySelector(".top-table");
		if(topTable) {
			topTable.remove();
		}
		
		const table = document.createElement("table");
		const tr = document.createElement("tr");
		const number = document.createElement("th");
		const time = document.createElement("th");
		const moves = document.createElement("th");
	
		table.classList.add("top-table");
		number.classList.add("top-table__header");
		time.classList.add("top-table__header");
		moves.classList.add("top-table__header");
		tr.classList.add("top-table__tr");
	
		number.innerHTML = "&#8470;";
		time.innerHTML = "Time";
		moves.innerHTML = "Moves";
			
		tr.appendChild(number);
		tr.appendChild(time);
		tr.appendChild(moves);
		table.appendChild(tr);
		this.rating.appendChild(table);
	
		if(localStorage.getItem('record')) {
			//get value from localStorage
			let test = localStorage.getItem('record');    
			//and parse it
			test = JSON.parse(test);
			
			//sort by moves
			test.sort((a, b) => {
				return a.moves - b.moves; 
			});
	
			let count = test.length;
			if(test.length > 10) {
				count = 10;
			}
			//output first 10 values
			for(let i = 0; i < count; i++) {      
				let tr2 = document.createElement("tr");
				let num2 = document.createElement("td");
				let time2 = document.createElement("td");
				let moves2 = document.createElement("td");
	
				tr2.classList.add("top-table__tr");
				num2.classList.add("top-table__td");
				time2.classList.add("top-table__td");
				moves2.classList.add("top-table__td");
	
				let counter = test[i].moves;
				let time = test[i].time;
	
				num2.innerHTML = i + 1;
				time2.innerHTML = time;
				moves2.innerHTML = counter;
	
				tr2.appendChild(num2);
				tr2.appendChild(time2);
				tr2.appendChild(moves2);
	
				table.appendChild(tr2);
			}
		}
	}
 
	run() {  
		this.init();

		const list = document.querySelector(".top_list"); 
		this.newGame = document.querySelector(".new-game");
		this.newGame.addEventListener("click", () => this.startNewGame());
		this.moves = document.querySelector(".moves");
		this.sound = document.querySelector('.sound');
		this.popup = document.querySelector('.popup');
		
		//update time 
		this.time = new Date();
		this.time.setHours(0);
		this.time.setMinutes(0);
		this.time.setSeconds(0);
		this.updateTime();
	
		// to move cell on click
		this.empty = this.gameKeys[this.size ** 2 - 1];
		this.gameKeys.forEach(cell => {
			cell.key.addEventListener('click', () => {
				//move cells by swap their coordinates
				if ((((cell.left + this.keySize === this.empty.left) || (cell.left - this.keySize === this.empty.left)) && (cell.top === this.empty.top)) || (((cell.top + this.keySize === this.empty.top) || (cell.top - this.keySize === this.empty.top)) && (cell.left === this.empty.left))) {
				if (this.sound.classList.contains('on')) {
					this.playSound();
				}
	
				let leftTemp = this.empty.left;
				let topTemp = this.empty.top;
				this.empty.left = cell.left;
				this.empty.top = cell.top;
				cell.left = leftTemp;
				cell.top = topTemp;
	
				//change styles to move key
				this.empty.key.style.left = `${this.empty.left}px`;
				this.empty.key.style.top = `${this.empty.top}px`;
				cell.key.style.left = `${cell.left}px`;
				cell.key.style.top = `${cell.top}px`;
	
				//moves counter
				this.count();
				}
				//is game finished? 
				if (this.counter > 1) {
				//every key should stand in its place
				const isFinished = this.gameKeys.every(picked => {
					let place = picked.top / this.keySize * this.size + picked.left / this.keySize;
					return picked.id === place;
				})
				if (isFinished) {
					//get item from local storage
					let test = localStorage.getItem('record');
	
					//if local storage is empty or not 
					if(test !== null) {
						let obj = JSON.parse(test);
						//push current time and moves to local storage
						obj.push({time: `${this.addZero(this.time.getHours())}<span>:</span>${this.addZero(this.time.getMinutes())}<span>:</span>${this.addZero(this.time.getSeconds())}`,
						moves: this.counter});
	
						localStorage.setItem('record', JSON.stringify(obj));
						
					} else {
						let object = [];
						//push current time and moves to local storage
						object.push({time: `${this.addZero(this.time.getHours())}<span>:</span>${this.addZero(this.time.getMinutes())}<span>:</span>${this.addZero(this.time.getSeconds())}`,
						moves: this.counter});
						localStorage.setItem('record', JSON.stringify(object));
					}
	
	
					//add time and moves on popup
					let timeElement = document.querySelector('.time-count');
					timeElement.innerHTML = `Time: ${this.addZero(this.time.getHours())}<span>:</span>${this.addZero(this.time.getMinutes())}<span>:</span>${this.addZero(this.time.getSeconds())}`;
					const movesElement = document.querySelector('.moves-count');    
					movesElement.innerHTML = `Moves: ${this.counter}`;
					this.popup.classList.remove('up-up');
					this.fillRating();
					
				}
				}
			})
	
		})
	
		//hide rating on click 
		this.rating = document.querySelector(".rating");
		list.addEventListener("click", () => {
			this.rating.classList.toggle("up-up");
		});
	
		this.fillRating();
	
		//to remove popup
		document.querySelector('.accept').addEventListener('click', () => {
			this.time.setHours(0);
			this.time.setMinutes(0);
			this.time.setSeconds(0);
			this.popup.classList.add('up-up');
			this.dischargeCounter();
		})
	
		//add sound
		this.sound.addEventListener('click', () => {
			if (this.sound.classList.contains('on')) {
				this.sound.classList.remove('on');
				this.sound.innerHTML = `<i class="material-icons">volume_off</i>`;
	
			} else {
				this.playSound();
				this.sound.classList.add('on');
				this.sound.innerHTML = `<i class="material-icons">volume_down</i>`;
			}
		}) 
	}	
 }