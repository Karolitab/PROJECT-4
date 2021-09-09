/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Class handler for game objects

class Game {
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
    * Creates phrases that will be display in the game
    * @return {array} of phrase objects
    */
    
     createPhrases() {
        const phrasesArray = [
            new Phrase('Pets are love'),
            new Phrase('I Love Cats'),
            new Phrase('Music is Life'),
            new Phrase('Never mind'),
            new Phrase('Summer is here')
        ];
        return phrasesArray;
      }

    /** 
    * Selects a random phrase 
    * @return {Object}  single phrase object
    */
     getRandomPhrase() {
        const number = Math.floor(Math.random() * this.phrases.length  - 1) + 1;
        return this.phrases[number];
        }

    /**
    * starts the game selecting and displaying the phrase to the user
    */
     startGame() {
        const screenOverlay = document.getElementById('overlay');
        screenOverlay.style.display = 'none'; // Hides start screen 
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
     }

     /**
      * 
      *  Handles button clicks that do specific functions
      */
    handleInteraction(chosenLetter){
        const selectedPhrase = this.activePhrase.phrase.split("");
        let letter ="";

        if(chosenLetter.type =='click'){
         chosenLetter.target.setAttribute('disabled', 'disabled');      
         letter = chosenLetter.target.innerHTML;
         let letterCheck = this.activePhrase.checkLetter(letter);
            if(letterCheck){
                this.activePhrase.showMatchedLetter(letter);
            }
        const foundLetter = selectedPhrase.filter(selected => selected === letter);
            if(foundLetter.length == 0){
                chosenLetter.target.classList.add('chosen');
                chosenLetter.target.classList.add('wrong');
                let noHeart = this.removeLife();
                if(noHeart){
                    this.gameOver(false);
                }
            } else {
               chosenLetter.target.classList.add('chosen');
               //if checkForWin===true, trigger gameOver() and win the game;
               let checkWin = this.checkForWin();               
               if(checkWin){
                this.gameOver(true);   
               }
            }            
        } else {           
            if(chosenLetter.type == 'keydown'){
              letter = chosenLetter.key;
              let letterCheck = this.activePhrase.checkLetter(letter);
                if(letterCheck){
                    this.activePhrase.showMatchedLetter(letter);
                }
                const keys = qwerty.querySelectorAll('.key');
                for(let i = 0;  i < keys.length; i++){
                    if(!keys[i].hasAttribute('disabled')){
                        if(letter === keys[i].innerHTML && letter != null) {
                            chosenLetter = keys[i].innerHTML;
                            keys[i].classList.add('chosen');
                            keys[i].setAttribute('disabled', 'disabled');
                            this.activePhrase.checkLetter(letter); 
        
                            //checks if the letter is in the phrase
                            const foundLetter = selectedPhrase.filter(selected => selected === letter);
                            if(foundLetter.length == 0){
                                keys[i].classList.add('wrong');
                                // if no hearts left. Set false value to gameOver to lose the game
                                let noHeart = this.removeLife();
                                if(noHeart){
                                    this.gameOver(false);
                                }
                            } else {
                                //this.checkForWin();
                                let checkWin = this.checkForWin();               
                                if(checkWin){
                                 this.gameOver(true);   
                                }
        
                            }    
                        } // end of if statement  
                    }         
                } // end of for loop 
            }
        }
    }// end of handleInteraction()

    /**
    * Checks for winning 
    * @return {boolean} True if game has been won, false if game lost
    */
    checkForWin(){
        const hideLetters = document.getElementsByClassName('hide');
        return hideLetters.length ===0
        }

    /**
    * Increases of the game class missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if not
    */
     removeLife(){
        let heartImg = document.getElementsByTagName('img');
        heartImg[this.missed].src = 'images/lostHeart.png';
        this.missed += 1;
           if ( this.missed >= 5){
           this.gameOver();
           }
       }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlay = document.getElementById("overlay");
        const gameOverMesssage = document.getElementById("game-over-message");
        
        if(gameWon){
            overlay.style.display = 'flex';
            gameOverMesssage.innerHTML = `Winner winner chiken dinner!You guessed the phrase: "${this.activePhrase.phrase}"`; //EXTRA; Displays the phrase to the user
            overlay.classList.add('win');
           
                       
        } else {
           overlay.style.display = 'flex';
            gameOverMesssage.innerHTML = `Better luck next time:( Your phrase was: "${this.activePhrase.phrase}"`; //EXTRA; Displays the phrase to the user
            overlay.classList.add('lose');                  

        }    
    }

    /** Resets the game the user wins or lose the game. 
     * This occurs when the user presses the start button
     * 
     */

     resetGame(){
        const phraseUL = document.querySelector('#phrase ul');
        phraseUL.innerHTML = '';

        const keys = document.querySelectorAll('.key');
        keys.forEach(button => button.className = 'key');
        keys.forEach(button => button.disabled = false);

        let lives = document.querySelectorAll('img');
        lives.forEach(life => life.src = 'images/liveHeart.png');

        this.missed = 0;
                   
    
    }
}