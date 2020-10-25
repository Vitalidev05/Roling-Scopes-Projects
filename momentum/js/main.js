'use strict';
const time = document.querySelector('.time'),
	greeting = document.querySelector('.greeting'),
	name = document.querySelector('.name'),
	focus = document.querySelector('.focus'),
	timeWeeks = document.querySelector('.time-weeks');
	// reload = document.querySelector('.reload');

let readyToReset = true;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function showTime() {
	let today = new Date(),
		month = today.getMonth(),
		date = today.getDate(),
		day = today.getDay(),
		hour = today.getHours(),
		min = today.getMinutes(),
		sec = today.getSeconds();	

	time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

	timeWeeks.innerHTML = `${daysNames[day]}, ${date} ${monthNames[month]}`;
	//update time per sec
	setTimeout(showTime, 1000);
}

//add if it is needed zero
function addZero(n) {
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Get Name
function getName() {
	if (localStorage.getItem('name') === null ||
	 localStorage.getItem('name').replace(/\s/g, '') === '') {
	  name.textContent = '[Enter Name]';
	} else {
	  name.textContent = localStorage.getItem('name');
	}
}
 // Set Name
function setName(e) {
	if (e.type === 'keypress') { 
		readyToReset = false;	
	  // Make sure enter is pressed
	  if (e.which == 13 || e.keyCode == 13) {

		 if(e.target.innerText.replace(/\s/g, '') !== '') {
			localStorage.setItem('name', e.target.innerText.trim());
			name.blur();			
		 }
		getName();	
		readyToReset = true;		
	  }
	} else {
		readyToReset = false;	
		if(e.target.innerText.replace(/\s/g, '') !== '') {
			localStorage.setItem('name', e.target.innerText.trim());
			name.blur();			
		 }
		 getName();
		 readyToReset = true;
	}
}

 // Get Focus
function getFocus() {
	if (localStorage.getItem('focus') === null ||
	 localStorage.getItem('focus').replace(/\s/g, '') === '') {
		focus.textContent = '[Enter Focus]';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
}
 
 // Set Focus
 function setFocus(e) {
	if (e.type === 'keypress') { 
		readyToReset = false;	
		// Make sure enter is pressed
		if (e.which == 13 || e.keyCode == 13) {
		  if(e.target.innerText.replace(/\s/g, '') !== '') {
			 localStorage.setItem('focus', e.target.innerText.trim());
			 focus.blur();
		  }
		  getFocus();
		  readyToReset = true;

		}
	 } else {
		readyToReset = false;	
		if(e.target.innerText.replace(/\s/g, '') !== '') {
			 localStorage.setItem('focus', e.target.innerText.trim());
			 name.blur();
		}
		getFocus();
		readyToReset = true;
	}
}

function reset() {
	if(readyToReset) {
		this.innerHTML = '';
	} 
}
 
name.addEventListener('click', reset);
focus.addEventListener('click', reset);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
getName();	
getFocus();