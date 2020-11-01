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

}

let keyboard = new Keyboard('ru');