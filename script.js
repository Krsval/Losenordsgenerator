//DOM elements

const resultElement = document.getElementById('result');
const sliderElement = document.getElementById('slider');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numberElement = document.getElementById('number');
const symbolElement = document.getElementById('symbol');
const generateElement = document.getElementById('generate');
const copyElement = document.getElementById('copy');
const strengthMeter = document.getElementById('strength-meter');
const poorBlock = document.getElementById('poor')
const weakBlock = document.getElementById('weak')
const mediumBlock = document.getElementById('medium')
const strongBlock = document.getElementById('strong')

// funtion-objects
const randomChars = {
    lower: randomLower,
    upper: randomUpper,
    number: randomNumber,
    symbol: randomSymbol
};


//Generera event
generateElement.addEventListener('click', () => {
    const length = +sliderElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numberElement.checked;
    const hasSymbol = symbolElement.checked;

    resultElement.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );

});

// Kopiera lösenordet på copy symbolen

copyElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard')
})

// Generera lösenord funktion
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Påbörja lösenords variabel
        let generatePassword = '';


    // 2. Filtrera ut unchecked checkmarks
    //    typesCount för att få ut hur många checkmarks som är valda
    //    typesArr för att få ut om checkmarks är true eller false
    //    Filter metoden för att loopa igenom varje checkmark och filtrera ut alla som är UNchecked
    const typesCount = lower + upper + number + symbol;


    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
    (
        checkmark => Object.values(checkmark)[0]
    );


    if(typesCount === 0) {
        return '';
    }


    // 3. Loopa över längden och kalla på en generations funktion för varje checkmark

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const characters = Object.keys(type)[0];
            //console.log('characters: ', characters);

            generatePassword += randomChars[characters]();
        });
    }

    // 4. Lägga till lösenordet i variabeln och returnera
    const finalPassword = generatePassword.slice(0, length);

    return finalPassword;
};

// generator finktioner
// genererar random tecken MHA CharCoden

function randomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);

}

function randomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

}

function randomNumber() {
    return (Math.floor(Math.random() * 10) + 0);

}

function randomSymbol() {
    const symbols = "!#$%&()*+,-./<=>?@[]^_{|}/~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}


function lengthWeakness(password) {
    const length = password.length

    if (length <=6){
        poorBlock.style.backgroundColor = '#ffa257'
        poorBlock
    }
    else if (length <=10){
        weakBlock.style.backgroundColor = '#ffa257'
    }
    else if (length <=14){
        mediumBlock.style.backgroundColor = '#ffa257'
    }
    else {
        strongBlock.style.backgroundColor = '#ffa257'
    }


};