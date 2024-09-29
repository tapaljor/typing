function _(el) {
    return document.getElementById(el);
}
const quoteDisplay = _("quoteDisplay");
const quoteInput = _("quoteInput");
const user = _("user");
const name = prompt("Enter your name");
const wpm = _("wpm");
const top20 = _("top20");
let random = false;
let speed = 0;
let date = false;

/*Typng speed JS*/
var iLastTime = 0;
var iTime = 0;
var iTotal = 0;
var iKeys = 0;

user.innerText = name;

function checkSpeed() {
    
    iTime = new Date().getTime();
    if (iLastTime !== 0) {
        iKeys++;
        iTotal += iTime - iLastTime;
        iWords = $('input').val().split(/\s/).length;
        speed = iWords / iTotal * 60000;
        speed = speed.toFixed(2);
        wpm.innerHTML = speed+'<p style="font-size: 14px; margin: 0;">WPM</p>';
    }
    iLastTime = iTime;
}

//**END of typing speed */

quoteInput.addEventListener("input", () => {
    
    checkSpeed();
    
    const inputArray = quoteInput.value.split('');
    const quoteArray = quoteDisplay.querySelectorAll('span');

    let correct = true;   
    quoteArray.forEach((characterSpan, index) => {
       
        let inputValue = inputArray[index];
       
        if ( inputValue == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        else if ( characterSpan.innerText === inputValue) {
           characterSpan.classList.add('correct');
           characterSpan.classList.remove('incorrect');
           correct = true;
        } else { 
           characterSpan.classList.add('incorrect');
           characterSpan.classList.remove('correct');
           correct = false;
        }
    });
    if ( correct) {
        iLastTime = 0;
        iTime = 0;
        iTotal = 0;
        iKeys = 0;
        nextQuote();
        quoteDisplay.innerText = null;
        quoteInput.value = null;
        wpm.innerText = '--';
        random = new Date().getTime();
    	date = new Date();
	    let time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	    top20.innerHTML = '<div class="result"><div class="time">'+time+'</div><div class="speed">'+speed+'</div></div>'+top20.innerHTML;
	        }
});
function getQuote() {
     return fetch("/quote")
    .then (resp => resp.json())
    .then (resp => resp["content"]);
}
async function nextQuote() {
    const quote = await getQuote();
    quote.split('').forEach(character => {
       const characters = document.createElement('span');
       characters.innerText = character;
       quoteDisplay.appendChild(characters);
    });
}

nextQuote();
