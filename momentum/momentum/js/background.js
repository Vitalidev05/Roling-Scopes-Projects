'use strict';
Array.prototype.rand = function() {
	return this.sort(function() { return 0.5 - Math.random(); });
}
let reload = document.querySelector('.reload');

let currentHour = new Date().getHours();
let count = 0;
let randomImages = ['01', '02', '03', '04', '05', '06', '07', '08', '09',
'10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].rand();
const randomElements = [randomImages.slice(0, 6), randomImages.slice(6, 12), randomImages.slice(12, 18),
	randomImages.slice(18, 20).concat(randomImages.slice(0, 4))];

function getPartDay(hour) {
	let partDay;
	if(hour < 12 && hour >= 6) {
		partDay = 'morning';
	} else
	if(hour < 18 && hour >= 12) {
		partDay = 'day';	
	}else 
	if(hour < 24 && hour >= 18) {
		partDay = 'evening';
	}else {
		partDay = 'night';
	}
	return partDay;
}

function setBackground() {
	let hour = new Date().getHours();

	if(hour < 12 && hour >= 6) {
		//morning
		 greeting.textContent = 'Good morning, ';
	} else
	if(hour < 18 && hour >= 12) {
		//day	
		 greeting.textContent = 'Good afternoon, ';
	}else 
	if(hour < 24 && hour >= 18) {
		//evening
		greeting.textContent = 'Good evening, ';
	}else {
		//night
		greeting.textContent = 'Good night, ';
	}
	
	// console.log(Math.floor(23 / 6) * 6  );
	const img = document.createElement('img');
	img.src = `assets/images//${getPartDay(hour + count)}/${randomElements[Math.floor((hour + count) / 6)]
	[Math.floor((hour + count)  - Math.floor((hour + count) / 6) * 6)]}.jpg`;

	img.onload = () => {
		document.body.style.backgroundImage = 
		`url('assets/images/${getPartDay(hour + count)}/${randomElements[Math.floor((hour + count) / 6)]
			[Math.floor((hour + count)  - Math.floor((hour + count) / 6) * 6)]}.jpg')`;
	}
	
	setTimeout(setBackground, 1000);
}

reload.addEventListener('click', () => {
	count++;
	if(currentHour + count === 24) {
		count = -currentHour;
	}
	reload.classList.add('reload-animation');
	setTimeout(() => {reload.classList.remove('reload-animation')}, 1000);
	setBackground();
	reload.disabled = true;
	setTimeout(function() { reload.disabled = false }, 1000);	
});



setBackground();