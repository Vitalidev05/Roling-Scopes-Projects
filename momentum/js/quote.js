// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.reload-quote');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {
  btn.classList.add('reload-animation');
  setTimeout(() => {btn.classList.remove('reload-animation')}, 1000);
	
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);	
  
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);  
  const data = await res.json(); 

  blockquote.textContent = data.quote.body;  
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);