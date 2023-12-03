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
    phrasesField.innerHTML += `<div id="drag${i + 1}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${subPhrases[i]}</div>`;
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
    if (id.includes('drag')) {
        event.target.innerHTML += `<div id="text${id.slice(id.length - 1)}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data} </div>`;
        event.target.style.padding = "0";
        event.target.style.width = "auto"
        event.target.style.height = "auto"
        document.querySelector(`#text${id.slice(id.length - 1)}`).style.margin = "0";
    }
    if (id.includes('text')) {
        const parent = document.querySelector(`#${id}`).parentElement;
        event.target.innerHTML += `<div id="drag${id.slice(id.length - 1)}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data.trim()}</div>`;
        parent.style.padding = "8px";
        parent.style.width = "50px";
        parent.style.height = "20px";
        document.querySelector(`#drag${id.slice(id.length - 1)}`).style.margin = "16px 8px";
    }
    document.querySelector(`#${id} `).remove();
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