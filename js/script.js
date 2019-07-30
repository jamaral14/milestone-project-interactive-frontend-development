const cards = document.querySelectorAll('.memory-card'); /* list of all memory cards and stored with name of const cards */

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
  /*console log("Hello!"); */
  /*funtion was called*/
  /*console log("this"); */
  /*this keyword was  */
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
  /*we can see if cards macth */
  /*console log(firstCard.dataset.image) */
  /*console log(secondCard.dataset.image) */
}

/*if the cards match this is the function checkForMatch */
function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;


  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  /*console log("Function was executed!") */
  resetBoard();
}

/*if the cards don't match we do unflipCards */

function unflipCards() {
  lockBoard = true; /*avoid two sets of cards being turned at the same time */

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 750); /*set the time to 750 to make the game for difficult :) */
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() { /*generate a random number between 0 and 12 */
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); /*the floor() method rounds a number DOWNWARDS to the nearest integer, and returns the result */
    card.style.order = randomPos;
  });
})();

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}
else {
  ready();
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  let cards = Array.from(document.getElementsByClassName('memory-card'));

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      console.log('user clicket');
      overlay.classList.remove('visible');
      
    });
  });

}

 
cards.forEach(card => card.addEventListener('click', flipCard)); /* create a loop to wicth card */
