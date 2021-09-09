/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = '';
//selects the start game button
const startButton = document.getElementById("btn__reset");
const overlay = document.querySelector('#overlay');
//adds event listener for the start game button
startButton.addEventListener('click', (e) => {

    //resets the game after the first win or lost.
    if(overlay.classList.contains('win') || overlay.classList.contains('lose')){
        game.resetGame();
    }

    if(e.target.id === startButton.id){    
        game = new Game();
        game.startGame();        
    } 
});
const qwerty = document.getElementById("qwerty");
// Adds event listener for mouse clicks on the game keyboard
qwerty.addEventListener('click', (e) => {
    let chosenLetter = e;
                  
    if(chosenLetter.target.tagName === 'BUTTON' ){

        game.handleInteraction(chosenLetter);
    }
});
//EXTRA CREDIT keyboard functionality 
window.addEventListener('keydown', (e) => {
    //condition prevents the event from listening.
    if(overlay.style.display == 'none'){
        const chosenLetter  = e;
        game.handleInteraction(chosenLetter);
    }                       
});

