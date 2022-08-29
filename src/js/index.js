import '../css/style.css';
import '../assets/mythicCardBackground.png';
import {
  rollDown,
  rollUp,
  putDeck,
  newGame,
  changeCard,
} from './functions';

document.addEventListener('click', (e) => {

  // button-up
  if (e.target.classList.contains('button-up')) rollUp()

  // button-down
  if (e.target.classList.contains('button-down')) rollDown()

  // ancient-card
  if (e.target.classList.contains('ancient-card')) {
    rollDown();
    newGame(e.target);
  }

  // stage
  if (e.target.classList.contains('difficulty-level')) {
    rollDown();
    putDeck();
    newGame(e.target);
  }

  // deck-img
  if (e.target.classList.contains('deck-img')) changeCard();

  if (e.target.classList.contains('close')) info2.classList.add('dispnone');

});