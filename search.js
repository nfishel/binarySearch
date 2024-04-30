console.log('It worked!!!');

let numberSet = [];
let magicNumber = 0;

const numCards = document.querySelector('#numCards');
const goBtn = document.querySelector('#goBtn');
const message = document.querySelector('#message');
message.style.display = "none";
const h1 = document.querySelector('h1');
goBtn.addEventListener('click', function(){
    generateNumberSet(parseInt(numCards.value));
    magicNumber = pickRandomValue();
    h1.innerHTML = `Can you Find the Number: ${magicNumber}?`;
    displayOutput();
    console.log(`the number is: ${magicNumber}`);
    setUpClicks();
});

function setUpClicks(){
    const cards = document.querySelectorAll('.defaultCard');
    cards.forEach(function(card){
        card.addEventListener('click', function(){
            tellMe(card);

        });

    });
}

function tellMe(card){
    message.style.display = "flex";
    
    const selectedValue = parseInt(card.dataset.val);
    //console.log(numberSet.indexOf(selectedValue));
    card.classList.toggle('guessedCard');
    card.innerHTML = card.dataset.val;
    if(magicNumber === selectedValue){
        message.innerHTML = 'You are correct!';
    }else if(magicNumber >= selectedValue){
        message.innerHTML = 'Guess a BIGGER number';
    }else{
        message.innerHTML = 'Guess a SMALLER number';
    }
    
}

function generateNumberSet(howmany){
message.style.display = "none";
    //console.time();
    numberSet = [];
    while(numberSet.length < howmany){
        const randomValue = Math.floor(Math.random()*100*howmany)+1;
        if(!numberSet.includes(randomValue)){
            numberSet.push(randomValue);
        }
    }
    numberSet.sort((a, b) => a - b);
    // console.log(numberSet);
    // console.timeEnd();
}

function pickRandomValue(){
    const index = Math.floor(Math.random()*numberSet.length);
    return(numberSet[index]);
}

function displayOutput(){
    const userInput = document.querySelector('#userInput');
    
    if(document.querySelector('.container')){
        document.querySelector('.container').remove();
        message.innerHTML = "";
    }
    const container = document.createElement('div');
    container.classList.add('container');
    userInput.insertAdjacentElement("afterend", container);

    for(let i=0; i<numberSet.length; i++){
        const div = document.createElement('div');
        div.classList.add('defaultCard');
        div.setAttribute("data-val", numberSet[i]);
        //div.innerHTML = numberSet[i];
        div.innerHTML = "?";
        container.insertAdjacentElement("beforeend", div);
        
    }
}
