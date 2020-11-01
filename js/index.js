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
}

let keyboard = new Keyboard('ru');