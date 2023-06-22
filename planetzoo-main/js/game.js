/*Aqui criamos funções para criar várias cartas ao mesmo tempo para nós*/
const grid = document.querySelector('.grid');

/*Aqui vamos criar uma função que nos permita criar cartas diferentes umas das outras*/
const characters = [
    'aguaviva', 
    'baleia',
    'coala',
    'cobra',
    'elefante',
    'esquilo',
    'foca',
    'girafa',
    'leao',
    'tigre',
    'raposa',
    'arara',
    'respostaaguaviva',
    'respostabaleia',
    'respostacoala',
    'respostacobra',
    'respostaelefante',
    'respostaesquilo',
    'respostafoca',
    'respostagirafa',
    'respostaleao',
    'respostatigre',
    'respostaraposa',
    'respostaarara',
];

const createElement = (tag, className, id) => {
    const element = document.createElement(tag);
    element.className = className;
    element.id = id;
    return element; 
}

let firstCard = '';
let secondCard = '';
let saveFirstId = '';
let score = 0;

const checkCards = ({target}) => {
    console.log("click atual:" + secondCard + "||click anterior:" + firstCard);

    if(firstCard == secondCard){
        document.getElementById(target.id).remove();
        document.getElementById(saveFirstId).remove();

        firstCard = '';
        secondCard = '';
        saveFirstId = '';
        score++;
        return;
    } else if(secondCard != ''){
        setTimeout(()=> {
            document.getElementById(target.id).parentNode.classList.remove('reveal-card');
            document.getElementById(saveFirstId).parentNode.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
            saveFirstId = '';
            return;
        },700)
    }
}

/* Aqui a gente revela a carta quando clicamos nela*/
const revealCard = ({target}) => {
    /*Podemos ter um bug de quando clicarmos na carta já virada podemos virar ela de volta, logo*/
    if (target.parentNode.className.includes('revel-card')) {
        return;
    }
    /*Aqui é para deixar virar apenas duas cartas de uma vez*/
    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        
        saveFirstId = target.id;

        if(target.id.length > 8){
            firstCard = target.id.substring(8,target.id.length);
        }
        else{
            firstCard = target.id;
        }

    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');

        if(target.id.length > 8){
            secondCard = target.id.substring(8,target.id.length);
        }
        else{
            secondCard = target.id;
        }
    }
    /*Agora, para verificarmos se as duas cartas formam seu par correspondente, usamos*/
    checkCards({target});
    

    if(characters.length / 2 == score){
        window.location.href = "../pages/conclusao.html";
    }
}

/*Essa função aqui é a que vai criar a carta pra gente sem precisarmos ficar repetindo o código*/
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front', character);
    const back = createElement('div', 'face back', character);

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    return card; 
}

/*Aqui a gente vai chamar a função de criar cartas para se repetir várias vezes*/

const loadGame = () => {

    /*Aqui embaralhamos as cartas*/
    const shuffledArray = characters.sort( () => Math.random() - 0.5);

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card); 
    });
}

loadGame();