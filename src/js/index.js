import '../css/style.css';
import '../assets/mythicCardBackground.png';
import AncientsData from "../data/ancients";
import Difficulties from "../data/difficulties";
import { brownCards, blueCards, greenCards } from "../data/mythicCards/index";

const buttonUp = document.querySelector('.button-up');
const buttonDown = document.querySelector('.button-down');
const container = document.querySelector('.container');

const ancientCards = container.querySelectorAll('.ancient-card');
const sectionElements = container.querySelectorAll('section');
const allStages = container.querySelectorAll('.stage');

const firstStageGreenCard = container.querySelector('.first-stage .dot-green');
const firstStageBrownCard = container.querySelector('.first-stage .dot-brown');
const firstStageBlueCard = container.querySelector('.first-stage .dot-blue');

const secondStageGreenCard = container.querySelector('.second-stage .dot-green');
const secondStageBrownCard = container.querySelector('.second-stage .dot-brown');
const secondStageBlueCard = container.querySelector('.second-stage .dot-blue');

const thirdStageGreenCard = container.querySelector('.third-stage .dot-green');
const thirdStageBrownCard = container.querySelector('.third-stage .dot-brown');
const thirdStageBlueCard = container.querySelector('.third-stage .dot-blue');

const timeOut = 200;
let selectedAncient;
let ancient;
let selectedStage;
let stage;
let count = 0;
let offset = 0;

// elementHeigt()
// @descripion    - returns element heigt
// @return        - number
// @param arr     - DOM element
const elementHeigt = (el) => el.offsetHeight;

// rollDown()
// @descripion    - scroll to next screen slide and set 
// buttonUp and buttonDown visible or hidden
const rollDown = () => {
  count += 1;
  offset = count * elementHeigt(sectionElements[count - 1]);

  setTimeout(() => {
    if (count == sectionElements.length - 1) {
      buttonDown.classList.add('dispnone')
    } else buttonDown.classList.remove('dispnone');

    container.style.transform = `translateY(-${offset}px )`;
    buttonUp.classList.remove('dispnone');

  }, timeOut)
}

// rollUp()
// @descripion    - scroll to previous screen slide and set  
// buttonUp and buttonDown visible or hidden
const rollUp = () => {
  count -= 1;
  offset = -count * elementHeigt(sectionElements[count]);

  setTimeout(() => {
    if (count == sectionElements.length - 1) {
      buttonDown.classList.add('dispnone')
    } else buttonDown.classList.remove('dispnone');

    if (count == 0) buttonUp.classList.add('dispnone');

    container.style.transform = `translateY(${offset}px )`;
  }, timeOut)
}

// getSelectedObj()
// @return one object
// @param arr - array contains objects when to find
// @param val - selected value to find
const getSelectedObj = (arr, val) => {
  let res;
  arr.forEach((obj) => {
    for (const key in obj) {
      if (obj[key] == val) res = obj;
    }
  })
  return res;
}

// getSelectedObj()
// @descripion    - returns an array of objects of given difficulty
// @return        - array of objects of given difficulty
// @param arr     - array of objects when to find
// @param stage   - stage value to find
const getCardsWithDifficulty = (arr, stage) => {
  return arr.filter((obj) => {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        return obj.difficulty == stage;
      }
    }
  })
}

// setDeck()
// @descripion    - set deck map
// @param ancient - object when to find number of cards
const setDeck = (ancient) => {
  firstStageGreenCard.textContent = ancient.firstStage.greenCards;
  firstStageBrownCard.textContent = ancient.firstStage.brownCards;
  firstStageBlueCard.textContent = ancient.firstStage.blueCards;

  secondStageGreenCard.textContent = ancient.secondStage.greenCards;
  secondStageBrownCard.textContent = ancient.secondStage.brownCards;
  secondStageBlueCard.textContent = ancient.secondStage.blueCards;

  thirdStageGreenCard.textContent = ancient.thirdStage.greenCards;
  thirdStageBrownCard.textContent = ancient.thirdStage.brownCards;
  thirdStageBlueCard.textContent = ancient.thirdStage.blueCards;
}

document.addEventListener('click', (e) => {

  // button-up
  if (e.target.classList.contains('button-up')) {
    rollUp();
  }

  // button-down
  if (e.target.classList.contains('button-down')) {
    rollDown();
  }

  // ancient-card
  if (e.target.classList.contains('ancient-card')) {
    ancientCards.forEach((el) => el.classList.remove('active'));
    setTimeout(() => e.target.classList.toggle('active'), timeOut)
    rollDown();

    selectedAncient = e.target.getAttribute('id');

    ancient = getSelectedObj(AncientsData, selectedAncient)

    setDeck(ancient)
  }

  // stage
  if (e.target.classList.contains('stage')) {
    allStages.forEach((el) => el.classList.remove('active'));
    setTimeout(() => e.target.classList.toggle('active'), timeOut)
    rollDown();

    selectedStage = e.target.getAttribute('id');
    stage = getSelectedObj(Difficulties, selectedStage);










    const GreenCards = getCardsWithDifficulty(greenCards, stage.id);
    const BrownCards = getCardsWithDifficulty(brownCards, stage.id);
    const BlueCards = getCardsWithDifficulty(blueCards, stage.id);

    console.log(stage.id)
    console.log('green', GreenCards)
    console.log('brown', BrownCards)
    console.log('blue', BlueCards)

    // TODO 
    // подбор карт исходя из сложности

    // Легкий  : убираются карты с щупальцами
    // Средний  : остается нетронутым
    // Высокий  : убираются карты со снежинками

    // brownCards - array objects with brown cards objects
    // blueCards - array objects with blue cards objects
    // greenCards - array objects with green cards objects

    /*
    fields:
    
    id: 'green1',
    ardFace: greenCardsAssets.green1,
    difficulty: 'easy',
    color:'green'
    */


























  }
  // deck-img
  if (e.target.classList.contains('deck-img')) {
    console.log('deck-img')
  }

});


