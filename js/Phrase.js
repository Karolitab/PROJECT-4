/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// Class that handles creation of Phrase objects which are created in Game class
class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }
    // Displays phrase hiding letter of the phrase
    addPhraseToDisplay(){
        const phraseSection = document.getElementById('phrase');
        const ul = phraseSection.querySelector('ul');
        for (let i = 0; i < this.phrase.length; i++) {
            if(this.phrase[i] !== " "){
                ul.innerHTML += `<li class="hide letter">${this.phrase[i]}</li>`;
                } else {
                    ul.innerHTML += `<li class="space">${this.phrase[i]}</li>`;
           }
        }
     }
    // Checks if the user chosen letter letter is in phrase
    checkLetter(letter){
        return this.phrase.includes(letter);
     }
    // Changes className to show correct guessed letters
    showMatchedLetter(letter){
        const correctPhrase = document.querySelectorAll('#phrase ul li ');
        for(let i = 0; i<correctPhrase.length;i++){
            if(correctPhrase[i].innerHTML === letter) {
                correctPhrase[i].className = 'show'; 
            }
        }
    }


} //end of Phrase class
