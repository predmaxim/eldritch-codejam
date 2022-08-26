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
const allDifficulties = container.querySelectorAll('.difficulty-level');

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

let cardsImgInDeck; // array of images cards in deck
let cardsInDeck = []; // array of objects cards in deck

let greenCardsWithDifficulty; // массив объектов - все выбранные зеленые карты с определенной сложностью
let brownCardsTWithDifficulty; // массив объектов - все выбранные коричневые карты с определенной сложностью
let blueCardsWithDifficulty; // массив объектов - все выбранные синие карты с определенной сложностью

let firstStageAllCardInDeck;// число - кол-во карт первой стадии
let secondStagAllCardInDeck;// число - кол-во карт второй стадии
let thirdStageAllCardInDeck;// число - кол-во карт третьей стадии

let allStageGreenCardInDeckToNeed;// число - кол-во зеленых карт
let allStageBrownCardInDecToNeed;// число - кол-во коричневых карт
let allStageBlueCardInDeckToNeed;// число - кол-во голубых карт

let selectedAncient; // DOM элемент - выбранный древний
let ancient; // строка - данный древний
let selectedDifficulty; // DOM элемент - выбранная сложность
let difficulty; // строка - данная сложность
let count = 0; // счетчик слойдера (секций)
let offset = 0; // сдвиг

/**
 * @function lementHeigt
 * @param {DOM element} element  
 * @return {number} - returns element heigt   
 */
const elementHeigt = (element) => element.offsetHeight;

/**
 * @function random
 * @param {number} min
 * @param {number} max
 * @return {number} - returns element heigt
 */
const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function rollDown
 * @return {*} - scroll to next screen slide and set
 * buttonUp and buttonDown visible or hidden
 */
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

/**
 * @function rollUp
 * @return {*} - scroll to previous screen slide and set
 * buttonUp and buttonDown visible or hidden
 */
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

/**
 * @function getSelectedObj
 * @param {array} arr - array contains objects when to find
 * @param {string} val - value of selected DOM element
 * @return {array} - get selected object
 */
const getSelectedObj = (arr, val) => {
  let res;
  arr.forEach((obj) => {
    for (const key in obj) {
      if (obj[key] == val) res = obj;
    }
  })
  return res;
}

/**
* @function getCardsWithDifficulty
* @param {array} arr - array of objects when to find
* @param {string} dif - difficulty value to find
* @return {array} - returns an array of objects of given difficulty
* */
const getCardsWithDifficulty = (arr, dif) => {
  return arr.filter((obj) => {
    for (const key in obj) {
      return obj.difficulty == dif;
    }
  })
}

/** 
 * @function setDeck
 * @param {object} ancient - object when to find number of cards
 * @return {*} - set deck map
 */
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

/** 
* @function getRandomCards
* @param {array} arr - array of card
* @param {string} dif - difficulty
* @param {number} mis - number of missing cards
* @returns {array} - get random cards in range and return array of objects
* */
const getRandomCards = (arr, dif, mis) => {
  const arrayOfCards = getCardsWithDifficulty(arr, dif);
  return arrayOfCards.filter((obj, idx) => {
    for (let i = 0; i < mis; i++) {
      let r = random(0, arrayOfCards.length - 1);
      if (idx == r) return obj;
    }

  })
}

/** 
 * @function putCardsInDeck
 * @param {array} el - array of objects to send
 * @param {array} arr - storage array
 * @return {*} - keeps the deck
 */
const putCardsInDeck = (el, arr) => el.forEach((e) => arr.push(e));

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

    setDeck(ancient); // установил колоду

    cardsInDeck = []; // обнуляем колоду

    // кол-во карт первой стадии
    firstStageAllCardInDeck =
      ancient.firstStage.greenCards +
      ancient.firstStage.brownCards +
      ancient.firstStage.blueCards;

    // кол-во карт второй стадии
    secondStagAllCardInDeck =
      ancient.secondStage.greenCards +
      ancient.secondStage.brownCards +
      ancient.secondStage.blueCards;

    // кол-во карт третьей стадии
    thirdStageAllCardInDeck =
      ancient.thirdStage.greenCards +
      ancient.thirdStage.brownCards +
      ancient.thirdStage.blueCards;


    // кол-во зеленых карт
    allStageGreenCardInDeckToNeed =
      ancient.firstStage.greenCards +
      ancient.secondStage.greenCards +
      ancient.thirdStage.greenCards;

    // кол-во коричневых карт
    allStageBrownCardInDecToNeed =
      ancient.firstStage.brownCards +
      ancient.secondStage.brownCards +
      ancient.thirdStage.brownCards;

    // кол-во голубых карт
    allStageBlueCardInDeckToNeed =
      ancient.firstStage.blueCards +
      ancient.secondStage.blueCards +
      ancient.thirdStage.blueCards;


  }

  // stage
  if (e.target.classList.contains('difficulty-level')) {
    console.log(e.target.getAttribute('id'))
    allDifficulties.forEach((el) => el.classList.remove('active'));
    setTimeout(() => e.target.classList.toggle('active'), timeOut)
    rollDown();

    selectedDifficulty = e.target.getAttribute('id');
    difficulty = getSelectedObj(Difficulties, selectedDifficulty);


    greenCardsWithDifficulty = getCardsWithDifficulty(greenCards, difficulty.id); // массив объектов - все выбранные зеленые карты с определенной сложностью
    brownCardsTWithDifficulty = getCardsWithDifficulty(brownCards, difficulty.id); // массив объектов - все выбранные коричневые карты с определенной сложностью
    blueCardsWithDifficulty = getCardsWithDifficulty(blueCards, difficulty.id); // массив объектов - все выбранные синие карты с определенной сложностью

    cardsInDeck = [];

    putCardsInDeck(greenCardsWithDifficulty, cardsInDeck);
    putCardsInDeck(brownCardsTWithDifficulty, cardsInDeck);
    putCardsInDeck(blueCardsWithDifficulty, cardsInDeck);
    console.log('cardsInDeck', cardsInDeck)

    // const getAllCardsAmount = (arr, color) => {
    //   const colors = { greenCards: 'green', brownCards: 'brown', blueCards: 'blue' };
    //   let c;

    //   for (const key in colors) {
    //     if (colors[key] == color) c = key;
    //   }

    //   return arr.reduce((acc, cur) => {
    //     for (const key in cur) {
    //       return cur.firstStage[c] + cur.secondStage[c] + cur.thirdStage[c];
    //     }
    //   }, 0)
    // }

    // ! правила добора недостающих карт

    // зеленые карты
    if (greenCardsWithDifficulty.length < allStageGreenCardInDeckToNeed) {


      let missingCardsAmount = allStageGreenCardInDeckToNeed - greenCardsWithDifficulty.length // кол-во
      console.log(missingCardsAmount)
      if (difficulty.id == 'easy') {
        let cardsToNeed = getRandomCards(greenCards, 'normal', missingCardsAmount) // arr of obj
        putCardsInDeck(cardsToNeed, cardsInDeck)
        console.log('cardsInDeck', cardsInDeck)
      }

      if (difficulty.id == 'normal') {
        let cardsToNeed = getRandomCards(greenCards, 'easy', missingCardsAmount) // arr of obj
        putCardsInDeck(cardsToNeed, cardsInDeck)
        console.log(cardsInDeck)
      }

      if (difficulty.id == 'hard') {
        let cardsToNeed = getRandomCards(greenCards, 'normal', missingCardsAmount) // arr of obj
        putCardsInDeck(cardsToNeed, cardsInDeck)
        console.log(cardsInDeck)
      }
    }

    // const 


  }


  // deck-img
  if (e.target.classList.contains('deck-img')) {
    console.log('deck-img')
  }

});


