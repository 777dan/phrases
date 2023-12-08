'use strict';

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

const getId = (oldId, newId) => newId + oldId.slice(oldId.length - 1);

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
    const currentId = event.dataTransfer.getData("id");
    const currentField = document.querySelector(`#${currentId}`).parentElement;
    const targetId = event.target.id;
    if (currentId.includes('drag')) {
        if (targetId.includes('textField')) {
            event.target.innerHTML += `<div id="${getId(currentId, 'text')}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data} </div>`;
            event.target.classList = "occupiedField";
            document.querySelector(`#${getId(currentId, 'text')}`).style.margin = "0";
            document.querySelector(`#${currentId} `).remove();
        }
        if (event.target.parentElement.id.includes('textField')) {
            phrasesField.innerHTML += `<div id="${getId(targetId, 'drag')}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${event.target.textContent.trim()}</div>`;
            event.target.parentElement.innerHTML += `<div id="${getId(currentId, 'text')}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data} </div>`;
            event.target.style.margin = "16px 8px";
            document.querySelector(`#${getId(currentId, 'text')}`).style.margin = "0";
            document.querySelector(`#${targetId}`).remove();
            document.querySelector(`#${currentId}`).remove();
        }
    }
    if (currentId.includes('text')) {
        if (targetId.includes('phrases')) {
            event.target.innerHTML += `<div id="${getId(currentId, 'text')}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${data.trim()}</div>`;
            currentField.classList = "emptyField";
            document.querySelector(`#${getId(currentId, 'drag')}`).style.margin = "16px 8px";
            document.querySelector(`#${currentId} `).remove();
        }
        if (event.target.parentElement.id.includes('textField')) {
            phrasesField.innerHTML += `<div id="${getId(targetId, 'drag')}" class="wordBlocks" draggable="true" ondragstart="drag(event)">${event.target.textContent.trim()}</div>`;
            currentField.classList = "emptyField";
            document.querySelector(`#${currentId}`).remove();
            event.target.parentElement.innerHTML = `<div id="${currentId}" class="wordInner" draggable="true" ondragstart="drag(event)">${data}</div>`;
            event.target.remove();
        }
        if (targetId.includes('textField')) {
            currentField.classList = "emptyField";
            document.querySelector(`#${currentId}`).remove();
            event.target.innerHTML = `<div id="${currentId}" class="wordInner" draggable="true" ondragstart="drag(event)">${data}</div>`;
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
        sayAnswer(str.trim());
    } else {
        msgField.textContent = "Loss!";
    }
});

function sayAnswer(str) {
    const speechMsgInput = str;
    window.speechSynthesis.onvoiceschanged = function (e) {
        let voices = speechSynthesis.getVoices();
        if (speechMsgInput.length > 0) {
            speak(speechMsgInput, voices);
        }
    };
    function speak(text, voices) {
        let msg = new SpeechSynthesisUtterance();
        let voice = voices.find(voice => voice.name === 'Google US English');
        msg.text = text;
        msg.voice = voice;
        window.speechSynthesis.speak(msg);
    }
}
