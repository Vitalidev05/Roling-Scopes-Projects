import en from './layouts/en.js';
import language from './layouts/index.js';

const rowsOrder = [
	['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backslash', 'Delete'],
	['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
	['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'IntlBackslash', 'Enter'],
	['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
	['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

class Keyboard {
	constructor(lang) {
		this.lang = lang;
		this.textArea = document.createElement('textarea');
		this.keyboard;		
		this.keyboardKeys = [];
		this.keyboardButtons = [];
		this.capsMode = false;
		this.shiftMode = false;
		this.selectPosition = 0;
		this.mute = false;
		this.micro = false;
		this.create_textarea();
		this._init(this.lang);
		this.touch_input();
		this.focus();
		this.keyboard_input();
		this.keyboard_slide();
		this.switch_keys();
		this.selection();
		this.sound();
		this.setRecognizer();
	}

	setRecognizer() {
		console.log(this.micro);
		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const language = this.lang === 'en' ? 'en-US' : 'ru-RU';
		let recognizer = new SpeechRecognition();
		recognizer.lang = language;
		recognizer.continuous = true;
  
		recognizer.addEventListener('result', (e) => {
		  console.log(e);
		});
  
		// recognizer.addEventListener('end', this.properties.recognizer.stop);
	 }

	sound() {
		this.textArea.addEventListener('keydown', (e) => {	
			if(this.mute) {
				
			} else 
			if(e.key === 'Shift') {
				const audio = document.createElement('audio');
				audio.src = '../assets/sound/shift.mp3';
				audio.currentTime = 0;
				audio.play();
			} else
			if(e.key === 'Enter') {
				const audio = document.createElement('audio');
				audio.src = '../assets/sound/enter.mp3';
				audio.currentTime = 0;
				audio.play();
			} else
			if(e.key=== 'Backspace') {
				const audio = document.createElement('audio');
				audio.src = '../assets/sound/backspace.mp3';
				audio.currentTime = 0;
				audio.play();
			} else
			if(e.key === 'CapsLock') {
				const audio = document.createElement('audio');
				audio.src = '../assets/sound/capsLock.mp3';
				audio.currentTime = 0;
				audio.play();
			} else
			if(this.lang === 'en') {
				const audio = document.createElement('audio');
				audio.src = '../assets/sound/english.mp3';
				audio.currentTime = 0;
				audio.play();
			}
			else{
				const audio = document.createElement('audio');
				audio.src = '../assets/sound/russian.mp3';
				audio.currentTime = 0;
				audio.play();
			}
		});
		this.keyboardButtons.forEach(button => {

			button.addEventListener('click', () => {
				if(this.mute) {
				
				} else 
				if(button.innerHTML === 'Shift') {
					const audio = document.createElement('audio');
					audio.src = '../assets/sound/shift.mp3';
					audio.currentTime = 0;
					audio.play();
				} else
				if(button.innerHTML === 'Enter') {
					const audio = document.createElement('audio');
					audio.src = '../assets/sound/enter.mp3';
					audio.currentTime = 0;
					audio.play();
				} else
				if(button.innerHTML === 'Backspace') {
					const audio = document.createElement('audio');
					audio.src = '../assets/sound/backspace.mp3';
					audio.currentTime = 0;
					audio.play();
				} else
				if(button.innerHTML === 'CapsLock') {
					const audio = document.createElement('audio');
					audio.src = '../assets/sound/capsLock.mp3';
					audio.currentTime = 0;
					audio.play();
				} else				
				if(this.lang === 'en') {
					const audio = document.createElement('audio');
					audio.src = '../assets/sound/english.mp3';
					audio.currentTime = 0;
					audio.play();
				}
				else{
					const audio = document.createElement('audio');
					audio.src = '../assets/sound/russian.mp3';
					audio.currentTime = 0;
					audio.play();
				}
				
			});
		});
	}

	selection() {
		document.body.onclick = () => {
			this.textArea.selectionStart = this.textArea.selectionEnd
			 = this.selectPosition + this.textArea.value.length;	
		};
	}

	changeLang() {
		if(this.lang === 'ru') {
			this.lang = 'en'
		}else {
			this.lang = 'ru'
		}
		// console.log(language[this.lang]);
		let keyboardKeys = [];
		this.keyboardKeys.forEach(button => {
			language[this.lang].forEach(e => {
				if(button.code === e.code) {
					keyboardKeys.push(e);
				}
			});
		});
		this.keyboardKeys = keyboardKeys;

		for(let i = 0; i < this.keyboardKeys.length; i++) {
			if(this.keyboardButtons[i].innerHTML === '<i class="fas fa-volume-mute"></i>') {
				
			} else
			if(this.keyboardButtons[i].innerHTML === '<i class="fas fa-microphone"></i>') {
				
			} else 
			if(this.keyboardButtons[i].innerHTML === 'ru' || 
			this.keyboardButtons[i].innerHTML === 'en') {
				if(this.keyboardButtons[i].innerHTML === 'ru') {
					this.keyboardButtons[i].innerHTML = 'en';
				} else
				this.keyboardButtons[i].innerHTML = 'ru';
			} else
			this.keyboardButtons[i].innerHTML = this.keyboardKeys[i].small;
			if(this.keyboardButtons[i].innerHTML === 'Win') {
				this.keyboardButtons[i].innerHTML = '<i class="fab fa-windows"></i>';
			}
		}		
	}
	
	switch_keys() {
		if(this.capsMode || this.shiftMode) {
			if(this.capsMode) {
				this.keyboardButtons.forEach(button => {
					if(button.classList.contains('word')) {
						button.innerHTML = button.innerHTML.toUpperCase();
					}
				});
			} 
			if(this.shiftMode) {
				for(let i = 0; i < this.keyboardButtons.length; i++) {
					let button = this.keyboardButtons[i];
					let key = this.keyboardKeys[i];
					if(button.classList.contains('word')) {
						button.innerHTML = key.shift;
					}
				}
			}
			if(this.capsMode && this.shiftMode) {
				this.keyboardButtons.forEach(button => {
					if(button.classList.contains('word')) {
						button.innerHTML = button.innerHTML.toLowerCase();
					}
				});
			}
			if(this.capsMode && this.shiftMode === false) {
				for(let i = 0; i < this.keyboardButtons.length; i++) {
					let button = this.keyboardButtons[i];
					let key = this.keyboardKeys[i];
					if(button.classList.contains('word')) {
						button.innerHTML = key.small.toUpperCase();
					}
				}
			}

		}else {
			for(let i = 0; i < this.keyboardButtons.length; i++) {
				let button = this.keyboardButtons[i];
				let key = this.keyboardKeys[i];
				if(button.classList.contains('word')) {
					button.innerHTML = key.small;
				}
			}
		}	

		

	}

	keyboard_slide() {
		this.keyboard.classList.add('active');
		this.textArea.addEventListener('click', () => {
			this.keyboard.classList.add('active');
		});
	}

	keyboard_input() {
		this.textArea.addEventListener('keydown', (e) => {	
			
			for(let i = 0; i < this.keyboardButtons.length; i++) {	
				if(this.keyboardKeys[i].code === e.code) {	
							
					if(e.code === 'CapsLock') {
									
						if(this.capsMode)
							this.capsMode = false;
						else
							this.capsMode = true;
						this.switch_keys();
						this.keyboardButtons[i].classList.toggle('animate-button');
					}
					if(e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
						if(this.shiftMode)
							this.shiftMode = false;
						else
							this.shiftMode = true;
						this.switch_keys();
						this.keyboardButtons[i].classList.toggle('animate-button');
					}
					if(e.code !== 'CapsLock' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight') {
						this.keyboardButtons[i].classList.add('animate-button');
					}
					switch (e.code) {
						case 'ArrowRight': 
							this.selectPosition += 1;
							if(this.selectPosition > 0) 
								this.selectPosition = 0;
							break;
						case 'ArrowDown': 
							this.selectPosition -= 1;
							break;
						case 'ArrowLeft': 
							this.selectPosition -= 1;
							break;
						case 'ArrowUp': 
							this.selectPosition += 1;
							if(this.selectPosition > 0) 
								this.selectPosition = 0;
							break;
					
						default:
							break;
					}
				}
			}	
		});
		this.textArea.addEventListener('keyup', (e) => {
			for(let i = 0; i < this.keyboardButtons.length; i++) {	
				if(this.keyboardKeys[i].code === e.code) {
					if(e.code !== 'CapsLock' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight') {
						this.keyboardButtons[i].classList.remove('animate-button');
					}
				}
			}	
		});
	}

	focus() {
		this.textArea.focus();
		this.textArea.onblur = () => {
			this.textArea.focus();
		}
	}

	changeText(text) {
		return (this.capsMode) ? text.toUpperCase() : text;
	}

	touch_input() {
		let buttons = this.keyboardButtons;
		let keys = this.keyboardKeys;
		let text = this.textArea;
		
		buttons.forEach(button => {
			button.addEventListener('mousedown', () => {
				if(button.innerHTML === '<i class="fas fa-volume-mute"></i>') {
					button.classList.toggle('animate-button');
				}
				if(button.innerHTML === '<i class="fas fa-microphone"></i>') {
					button.classList.toggle('animate-button');
				}
				if(button.innerHTML === 'CapsLock') {
					button.classList.toggle('animate-button');
				}
				if(button.innerHTML === 'Shift') {
					button.classList.toggle('animate-button');
				}
				if(button.innerHTML !== 'Shift' && button.innerHTML !== 'CapsLock'
					&&  button.innerHTML !== '<i class="fas fa-volume-mute"></i>'
					&& button.innerHTML !== '<i class="fas fa-microphone"></i>') {
					button.classList.add('animate-button');
				}
			});
			button.addEventListener('mouseup', () => {
				if(button.innerHTML !== 'CapsLock' && button.innerHTML !== 'Shift'
					&& button.innerHTML !== '<i class="fas fa-volume-mute"></i>'
					&& button.innerHTML !== '<i class="fas fa-microphone"></i>') {
					button.classList.remove('animate-button');
				}
			});

			button.addEventListener('mouseout', () => {
				if(button.innerHTML !== 'CapsLock' && button.innerHTML !== 'Shift'
					&& button.innerHTML !== '<i class="fas fa-volume-mute"></i>'
					&& button.innerHTML !== '<i class="fas fa-microphone"></i>') {
					button.classList.remove('animate-button');
				}
			})
		});

		for(let i = 0; i < buttons.length; i++) {			
			buttons[i].addEventListener('click', () => {
				switch(keys[i].code) {
					case 'Tab':
						break;
					case 'Win':
						this.keyboard.classList.remove('active');
						break;
					case 'CapsLock': 
						if(this.capsMode)
							this.capsMode = false;
						else
							this.capsMode = true;
						this.switch_keys();
						break;
						
					case 'ShiftLeft': 
						if(this.shiftMode)
							this.shiftMode = false;
						else
							this.shiftMode = true;
						this.switch_keys();
						break;
					case 'ShiftRight':
						if(this.shiftMode)
							this.shiftMode = false;
						else
							this.shiftMode = true; 
						this.switch_keys();
						break;
					case 'Enter':
						text.value += '\n'; 
						break;
					case 'Backspace':
						let arr = text.value.split('').reverse();
						arr.splice(Math.abs(this.selectPosition), 1);
						text.value = arr.reverse().join('');
						break;
					case 'Delete': 
						if(this.micro)
							this.micro = false;
						else
							this.micro = true;
						this.setRecognizer();
						break;
					case 'ControlLeft': 
						break;
					case 'ControlRight': 
						break;
					case 'AltLeft': 
						this.changeLang();
						break;
					case 'AltRight': 
						if(this.mute)
							this.mute = false;
						else
							this.mute = true;
						
						break;
					case 'ArrowRight': 
						this.selectPosition += 1;
						if(this.selectPosition > 0) 
							this.selectPosition = 0;
						break;
					case 'ArrowDown': 
						this.selectPosition -= 1;
						break;
					case 'ArrowLeft': 
						this.selectPosition -= 1;
						break;
					case 'ArrowUp': 
						this.selectPosition += 1;
						if(this.selectPosition > 0) 
							this.selectPosition = 0;
						break;
					default:
						text.value += buttons[i].innerHTML ;
						break;
				}
			});
		}
	}

	create_textarea() {
		const displayBlock = document.createElement('div');

		displayBlock.className = 'display__block';
		this.textArea.className = 'display';
		this.textArea.placeholder = "Click there";
		displayBlock.append(this.textArea);
		document.body.append(displayBlock);	
	}

	_init(lang) {
		const keyboardSection = document.createElement('section');	
		keyboardSection.className = 'keyboard';

		rowsOrder.forEach(row => {
			const keyboardRow = document.createElement('div');
			keyboardRow.className = 'keyboard__row';

			row.forEach(key => {
				const KeyboardKey = document.createElement('button');
				KeyboardKey.className = 'keyboard__key';
				let small;
				let shift;
				language[lang].forEach(object => {
					if(key === object.code) {
						small = object.small;
						shift = object.shift;
					}
				});
				KeyboardKey.innerHTML = small;
				KeyboardKey.classList.add('special');
				switch(key) {
					case 'Tab': 
						KeyboardKey.classList.add('tab');
						break;
					case 'CapsLock': 
						KeyboardKey.classList.add('caps-lock');
						break;
					case 'ShiftLeft': 
						KeyboardKey.classList.add('shift-left');
						break;
					case 'ShiftRight': 
						KeyboardKey.classList.add('shift-right');
						break;
					case 'Enter': 
						KeyboardKey.classList.add('enter');
						break;
					case 'Backspace': 
						KeyboardKey.classList.add('backspace');
						break;
					case 'Delete': 
						KeyboardKey.innerHTML = '<i class="fas fa-microphone"></i>';
						KeyboardKey.classList.add('delete');
						break;
					case 'ControlLeft': 
						KeyboardKey.classList.add('control-left');
						break;
					case 'ControlRight': 
						KeyboardKey.classList.add('control-right');
						break;
					case 'Win': 
						KeyboardKey.classList.add('win');
						KeyboardKey.innerHTML = '<i class="fab fa-windows"></i>';
						break;
					case 'AltLeft': 
						KeyboardKey.innerHTML = lang;
						KeyboardKey.classList.add('alt-left');
						break;
					case 'Space': 
						KeyboardKey.classList.add('space');
						break;
					case 'AltRight': 
						KeyboardKey.classList.add('alt-right');
						
						KeyboardKey.innerHTML = '<i class="fas fa-volume-mute"></i>';
						break;
					case 'ArrowRight': 
						KeyboardKey.classList.remove('special');
						KeyboardKey.classList.add('arrow');
						KeyboardKey.classList.add('arrow-right');
						break;
					case 'ArrowDown': 
						KeyboardKey.classList.remove('special');
						KeyboardKey.classList.add('arrow');
						KeyboardKey.classList.add('arrow-down');
						break;
					case 'ArrowLeft': 
						KeyboardKey.classList.remove('special');
						KeyboardKey.classList.add('arrow');
						KeyboardKey.classList.add('arrow-left');
						break;
					case 'ArrowUp': 
						KeyboardKey.classList.remove('special');
						KeyboardKey.classList.add('arrow');
						KeyboardKey.classList.add('arrow-up');
						break;
					default:
						KeyboardKey.classList.remove('special');
						KeyboardKey.classList.add('word');

						break;
				}
				keyboardRow.append(KeyboardKey);
				this.keyboardKeys.push({small: small, shift: shift, code: key });
				this.keyboardButtons.push(KeyboardKey);
			});

			keyboardSection.append(keyboardRow);
		});

		document.body.append(keyboardSection);
		this.keyboard = keyboardSection;
	}

}

let keyboard = new Keyboard('ru');