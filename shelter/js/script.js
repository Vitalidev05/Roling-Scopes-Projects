let navToggle = document.querySelector('.nav-toggle');
let header = document.querySelector('.header');
let blockout = document.querySelector('.blockout');

function button() {
	navToggle.classList.toggle('active');
	header.classList.toggle('active');
	header.classList.toggle('animate');
	document.location = '#';

	document.body.classList.toggle('hidden');
	blockout.classList.toggle('blackout');
	
}

navToggle.addEventListener("click", button );

blockout.addEventListener('click', button );