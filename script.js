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

const shuffleArray = (array) => {
    const arrLength = array.length;
    let randIndex;
    for (let i = 0; i < arrLength; i++) {
        randIndex = Math.floor(Math.random() * arrLength);
        array[arrLength] = array[randIndex];
        array.splice(randIndex, 1);
    }
}
shuffleArray(subPhrases);

for (let i = 0; i < subPhrases.length; i++) {
    phrasesField.innerHTML += `<div id="drag${i + 1}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${subPhrases[i]}</div>`;
    dropField.innerHTML += `<div id="textField${i + 1}" class="emptyField" ondragover="allowDrop(event)" ondrop="drop(event)"></div>`;
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
    const currentField = document.querySelector(`#${id}`).parentElement;
    if (id.includes('drag')) {
        if (event.target.id.includes('textField')) {
            event.target.innerHTML += `<div id="text${id.slice(id.length - 1)}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data} </div>`;
            event.target.classList = "occupiedField";
            document.querySelector(`#text${id.slice(id.length - 1)}`).style.margin = "0";
            document.querySelector(`#${id} `).remove();
        }
        if (event.target.parentElement.id.includes('textField')) {
            phrasesField.innerHTML += `<div id="drag${event.target.id.slice(event.target.id.length - 1)}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${event.target.textContent.trim()}</div>`;
            event.target.parentElement.innerHTML += `<div id="text${id.slice(id.length - 1)}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data} </div>`;
            event.target.style.margin = "16px 8px";
            document.querySelector(`#text${id.slice(id.length - 1)}`).style.margin = "0";
            document.querySelector(`#${event.target.id} `).remove();
            document.querySelector(`#${id}`).remove();
        }
    }
    if (id.includes('text')) {
        if (event.target.id.includes('phrases')) {
            event.target.innerHTML += `<div id="drag${id.slice(id.length - 1)}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data.trim()}</div>`;
            currentField.classList = "emptyField";
            document.querySelector(`#drag${id.slice(id.length - 1)}`).style.margin = "16px 8px";
            document.querySelector(`#${id} `).remove();
        }
        if (event.target.parentElement.id.includes('textField')) {
            phrasesField.innerHTML += `<div id="drag${event.target.id.slice(event.target.id.length - 1)}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${event.target.textContent.trim()}</div>`;
            currentField.classList = "emptyField";
            document.querySelector(`#${id}`).remove();
            event.target.parentElement.innerHTML = `<div id="${id}" class="wordInner" draggable="true" ondragstart="drag(event)">${data}</div>`;
            event.target.remove();
        }
        if (event.target.id.includes('textField')) {
            currentField.classList = "emptyField";
            document.querySelector(`#${id}`).remove();
            event.target.innerHTML = `<div id="${id}" class="wordInner" draggable="true" ondragstart="drag(event)">${data}</div>`;
            event.target.classList = "occupiedField";
        }
    }
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