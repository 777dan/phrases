const phrases = [
    'This building was built in 1972',
    'Such a good day',
    'You must do it'
];

const phrase = phrases[Math.floor(Math.random() * phrases.length)];
const subPhrases = phrase.split(" ");
const phrasesField = document.querySelector('#phrases');
const msgField = document.querySelector('#msg');
const dropField = document.querySelector('#words');
const checkButton = document.querySelector('#check');
for (let i = 0; i < subPhrases.length; i++) {
    phrasesField.innerHTML += `<div id="drag${i + 1}" class="card" draggable="true" ondragstart="drag(event)">${subPhrases[i]}</div>`;
    dropField.innerHTML += `<div id="textField${i + 1}" class="words" ondragover="allowDrop(event)" ondrop="drop(event)"></div>`;
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.textContent);
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const id = event.dataTransfer.getData("id");
    dropField.innerHTML += `<span id="text${id.slice(id.length - 1)}" draggable="true" ondragstart="drag(event)">${data} </span>`;
    // dropField.innerHTML += `<span id="text${id.slice(id.length - 1)}" draggable="true" ondragstart="drag(event)">${data} </span>`;
    document.querySelector(`#${id}`).remove();
}

function dropBack(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const id = event.dataTransfer.getData("id");
    phrasesField.innerHTML += `<div id="drag${id.slice(id.length - 1)}" class="card" draggable="true" ondragstart="drag(event)">${data.trim()}</div>`;
    document.querySelector(`#${id}`).remove();
}

checkButton.addEventListener('click', () => {
    let str = "";
    for (let i = 0; i < dropField.children.length; i++) {
        str += dropField.children[i].textContent;
    }
    console.log(str.trim());
    if (str.trim() === phrase) {
        msgField.textContent = "Win!";
    } else {
        msgField.textContent = "Loss!";
    }
});