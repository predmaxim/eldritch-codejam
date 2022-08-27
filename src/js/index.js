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

const firstStageDots = container.querySelectorAll('.first-stage .dot');
const secondStageDots = container.querySelectorAll('.second-stage .dot');
const thirdStageDots = container.querySelectorAll('.third-stage .dot');


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

let greenCardsInDeck = [];
let brownCardsInDeck = [];
let blueCardsInDeck = [];

let greenCardsWithDifficulty; // массив объектов - все выбранные зеленые карты с определенной сложностью
let brownCardsWithDifficulty; // массив объектов - все выбранные коричневые карты с определенной сложностью
let blueCardsWithDifficulty; // массив объектов - все выбранные синие карты с определенной сложностью

let firstStageAllCardsInDeckAmount;// число - кол-во карт первой стадии
let secondStageAllCardsInDeckAmount;// число - кол-во карт второй стадии
let thirdStageAllCardsInDeckAmount;// число - кол-во карт третьей стадии

let greenCardsInFirstStage;
let greenCardsInSecondStage;
let greenCardsInThirdStage;

let brownCardsInFirstStage;
let brownCardsInSecondStage;
let brownCardsInThirdStage;

let blueCardsInFirstStage;
let blueCardsInSecondStage;
let blueCardsInThirdStage;

let allCardsInFirstStage = [];
let allCardsInSecondStage = [];
let allCardsInThirdStage = [];

let allStageGreenCardsToNeedAmount;// число - кол-во зеленых карт
let allStageBrownCardsToNeedAmount;// число - кол-во коричневых карт
let allStageBlueCardsToNeedAmount;// число - кол-во голубых карт

let missingCardsAmount = 0;
let allCards;
let cardsToNeed;
let cardsWithDif;

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
 * @function getObjectsFormArr
 * @param {array} arr - array contains objects when to find
 * @param {string} key - key to find
 * @param {string} val - value to find
 * @return {array} - return array of objects
 */
const getObjectsFormArr = (arr, key, val) => {
  return arr.filter((obj) => obj[key] == val ? obj : false)
}


// const addCards = (color, dif, cardsDif) => {
//   const colors = {
//     green: {
//       allCards: greenCards,
//       cardsToNeed: allStageGreenCardsToNeedAmount,
//       cardsWithDif: greenCardsWithDifficulty,
//     },
//     brown: {
//       allCards: brownCards,
//       cardsToNeed: allStageBrownCardsInDecToNeed,
//       cardsWithDif: brownCardsTWithDifficulty,
//     },
//     blue: {
//       allCards: blueCards,
//       cardsToNeed: allStageBrownCardsInDecToNeed,
//       cardsWithDif: blueCardsWithDifficulty,
//     },
//   }

//   allCards = colors[color].allCards;
//   // cardsToNeed = colors[color].cardsToNeed
//   cardsWithDif = colors[color].cardsWithDif

//   missingCardsAmount = cardsToNeed - cardsWithDif.length; // кол-во


//   console.log('cardsWithDif',cardsWithDif)

//   // if (difficulty.id == dif) {
//     cardsToNeed = getRandomCardsWithDif(color, cardsDif, missingCardsAmount); // arr of obj
//     console.log('cardsToNeed',cardsToNeed)
//     putCardsInDeck(cardsToNeed, cardsInDeck);
//   // }

// }


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
 * @function random
 * @param {number} max - max in range
 * @param {number} amount - number of digits to return
 * @return {array} - returns array of unique digits
 */
const random = (max, amount) => {
  let min = 0;
  let countR = [];

  while (countR.length < amount) {
    let r = Math.floor(Math.random() * (max - min + 1)) + min;
    if (countR.indexOf(r) === -1) countR.push(r);
  }

  return countR
};

/** 
* @function getRandomCardsWithDif
* @param {array} arr - array of card
* @param {string} dif - difficulty
* @param {number} mis - number of missing cards
* @returns {array} - get random cards in range and return array of cards objects 
* */
const getRandomCardsWithDif = (arr, dif, mis) => {
  let res = [];
  const сardsWithDifficulty = getObjectsFormArr(arr, 'difficulty', dif);
  return random(сardsWithDifficulty.length - 1, mis).reduce((acc, cur, idx) => {
    сardsWithDifficulty.forEach((el, i) => { if (i == cur) res.push(el) });
    return res;
  }, [])
}

/** 
* @function getRandomCards
* @param {array} arr - array of card
* @param {string} dif - difficulty
* @param {number} amount - number of cards
* @returns {array} - get random cards in range and return array of cards objects 
* */
const getRandomCards = (arr, amount, color) => {
  let res = [];
  return random(arr.length - 1, amount).reduce((acc, cur, idx) => {
    arr.forEach((el, i) => { if (i == cur) res.push(el) });
    return res;
  }, [])
}

/** 
 * @function putCardsInDeck
 * @param {array} arr - array of objects to send
 * @param {array} StoreArr - storage array
 * @return {*} - keeps the deck
 */
const putCardsInDeck = (arr, StoreArr) => arr.forEach((e) => StoreArr.push(e));





// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



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

    ancient = getObjectsFormArr(AncientsData, 'id', selectedAncient)[0];
    console.log(selectedAncient, ancient)

    // setDeck(ancient); // установил колоду

    cardsInDeck = []; // обнуляем колоду

    // кол-во карт первой стадии
    firstStageAllCardsInDeckAmount =
      ancient.firstStage.greenCards +
      ancient.firstStage.brownCards +
      ancient.firstStage.blueCards;

    // кол-во карт второй стадии
    secondStageAllCardsInDeckAmount =
      ancient.secondStage.greenCards +
      ancient.secondStage.brownCards +
      ancient.secondStage.blueCards;

    // кол-во карт третьей стадии
    thirdStageAllCardsInDeckAmount =
      ancient.thirdStage.greenCards +
      ancient.thirdStage.brownCards +
      ancient.thirdStage.blueCards;


    // кол-во зеленых карт
    allStageGreenCardsToNeedAmount =
      ancient.firstStage.greenCards +
      ancient.secondStage.greenCards +
      ancient.thirdStage.greenCards;
    // кол-во коричневых карт
    allStageBrownCardsToNeedAmount =
      ancient.firstStage.brownCards +
      ancient.secondStage.brownCards +
      ancient.thirdStage.brownCards;

    // кол-во голубых карт
    allStageBlueCardsToNeedAmount =
      ancient.firstStage.blueCards +
      ancient.secondStage.blueCards +
      ancient.thirdStage.blueCards;


  }

  // stage
  if (e.target.classList.contains('difficulty-level')) {

    allDifficulties.forEach((el) => el.classList.remove('active'));
    setTimeout(() => e.target.classList.toggle('active'), timeOut)
    rollDown();

    selectedDifficulty = e.target.getAttribute('id');
    difficulty = getObjectsFormArr(Difficulties, selectedDifficulty)[0];


    greenCardsWithDifficulty = getObjectsFormArr(greenCards, 'difficulty', difficulty.id); // массив объектов - все выбранные зеленые карты с определенной сложностью
    brownCardsWithDifficulty = getObjectsFormArr(brownCards, 'difficulty', difficulty.id); // массив объектов - все выбранные коричневые карты с определенной сложностью
    blueCardsWithDifficulty = getObjectsFormArr(blueCards, 'difficulty', difficulty.id); // массив объектов - все выбранные синие карты с определенной сложностью

    cardsInDeck = [];



    // зеленые карты
    if (greenCardsWithDifficulty.length < allStageGreenCardsToNeedAmount) {

      missingCardsAmount = allStageGreenCardsToNeedAmount - greenCardsWithDifficulty.length; // кол-во

      putCardsInDeck(greenCardsWithDifficulty, cardsInDeck);

      if (difficulty.id == 'easy') {
        cardsToNeed = getRandomCardsWithDif(greenCards, 'normal', missingCardsAmount); // arr of obj
        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }

      if (difficulty.id == 'normal') {
        cardsToNeed = getRandomCardsWithDif(greenCards, 'easy', missingCardsAmount); // arr of obj
        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }

      if (difficulty.id == 'hard') {
        cardsToNeed = getRandomCardsWithDif(greenCards, 'normal', missingCardsAmount); // arr of obj
        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }
    } else {
      putCardsInDeck(getRandomCardsWithDif(greenCards, difficulty.id, allStageGreenCardsToNeedAmount), cardsInDeck);
    }

    // коричневые карты
    if (brownCardsWithDifficulty.length < allStageBrownCardsToNeedAmount) {

      missingCardsAmount = allStageBrownCardsToNeedAmount - brownCardsWithDifficulty.length; // кол-во

      putCardsInDeck(brownCardsWithDifficulty, cardsInDeck);

      if (difficulty.id == 'easy') {
        cardsToNeed = getRandomCardsWithDif(brownCards, 'normal', missingCardsAmount); // arr of obj

        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsToNeed)
      }

      if (difficulty.id == 'normal') {
        cardsToNeed = getRandomCardsWithDif(brownCards, 'easy', missingCardsAmount); // arr of obj

        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }

      if (difficulty.id == 'hard') {
        cardsToNeed = getRandomCardsWithDif(brownCards, 'normal', missingCardsAmount); // arr of obj

        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }
    } else {
      putCardsInDeck(getRandomCardsWithDif(brownCards, difficulty.id, allStageBrownCardsToNeedAmount), cardsInDeck);
    }

    // голубые карты
    if (blueCardsWithDifficulty.length < allStageBlueCardsToNeedAmount) {

      missingCardsAmount = allStageBlueCardsToNeedAmount - blueCardsWithDifficulty.length; // кол-во

      putCardsInDeck(blueCardsWithDifficulty, cardsInDeck);

      if (difficulty.id == 'easy') {
        cardsToNeed = getRandomCardsWithDif(blueCards, 'normal', missingCardsAmount); // arr of obj

        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }

      if (difficulty.id == 'normal') {
        cardsToNeed = getRandomCardsWithDif(blueCards, 'easy', missingCardsAmount); // arr of obj

        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }

      if (difficulty.id == 'hard') {
        cardsToNeed = getRandomCardsWithDif(blueCards, 'normal', missingCardsAmount); // arr of obj

        putCardsInDeck(cardsToNeed, cardsInDeck);
        // console.log(cardsInDeck)
      }
    } else {
      putCardsInDeck(getRandomCardsWithDif(blueCards, difficulty.id, allStageBlueCardsToNeedAmount), cardsInDeck);
    }

    allCardsInFirstStage = [];
    allCardsInSecondStage = [];
    allCardsInThirdStage = [];
    allCards = [];

    greenCardsInFirstStage = getObjectsFormArr(cardsInDeck, 'color', 'green');
    brownCardsInFirstStage = getObjectsFormArr(cardsInDeck, 'color', 'brown');
    blueCardsInFirstStage = getObjectsFormArr(cardsInDeck, 'color', 'blue');
    greenCardsInSecondStage = getObjectsFormArr(cardsInDeck, 'color', 'green');
    brownCardsInSecondStage = getObjectsFormArr(cardsInDeck, 'color', 'brown');
    blueCardsInSecondStage = getObjectsFormArr(cardsInDeck, 'color', 'blue');
    greenCardsInThirdStage = getObjectsFormArr(cardsInDeck, 'color', 'green');
    brownCardsInThirdStage = getObjectsFormArr(cardsInDeck, 'color', 'brown');
    blueCardsInThirdStage = getObjectsFormArr(cardsInDeck, 'color', 'blue');

    greenCardsInFirstStage.forEach((e) => { allCardsInFirstStage.push(e) });
    greenCardsInSecondStage.forEach((e) => { allCardsInSecondStage.push(e) });
    greenCardsInThirdStage.forEach((e) => { allCardsInThirdStage.push(e) });

    brownCardsInFirstStage.forEach((e) => { allCardsInFirstStage.push(e) });
    brownCardsInSecondStage.forEach((e) => { allCardsInSecondStage.push(e) });
    brownCardsInThirdStage.forEach((e) => { allCardsInThirdStage.push(e) });

    blueCardsInFirstStage.forEach((e) => { allCardsInFirstStage.push(e) });
    blueCardsInSecondStage.forEach((e) => { allCardsInSecondStage.push(e) });
    blueCardsInThirdStage.forEach((e) => { allCardsInThirdStage.push(e) });

    allCardsInFirstStage.forEach((e) => { allCards.push(e) });
    allCardsInSecondStage.forEach((e) => { allCards.push(e) });
    allCardsInThirdStage.forEach((e) => { allCards.push(e) });


    firstStageGreenCard.textContent = ancient.firstStage.greenCards;
    firstStageBrownCard.textContent = ancient.firstStage.brownCards;
    firstStageBlueCard.textContent = ancient.firstStage.blueCards;

    secondStageGreenCard.textContent = ancient.secondStage.greenCards;
    secondStageBrownCard.textContent = ancient.secondStage.brownCards;
    secondStageBlueCard.textContent = ancient.secondStage.blueCards;

    thirdStageGreenCard.textContent = ancient.thirdStage.greenCards;
    thirdStageBrownCard.textContent = ancient.thirdStage.brownCards;
    thirdStageBlueCard.textContent = ancient.thirdStage.blueCards;

    console.log('cardsInDeck', cardsInDeck)
    console.log('greenCardsInFirstStage', greenCardsInFirstStage)

  }

  // firstStageDots.reduce((acc, cur) => {

  // }, 0)

  // secondStageDots
  // thirdStageDots


  random()



  // deck-img
  if (e.target.classList.contains('deck-img')) {

    if (allCardsInFirstStage.length - 1 > 0) {

      allCardsInFirstStage.splice(0, 1);
      console.log(allCardsInFirstStage)

    } else if (allCardsInSecondStage.length - 1 > 0) {

      allCardsInSecondStage.splice(0, 1);
      console.log(allCardsInSecondStage)

    } else if (allCardsInThirdStage.length - 1 > 0) {

      allCardsInThirdStage.splice(0, 1);
      console.log(allCardsInThirdStage)

    } else console.log('game over')

    allCardsInFirstStage
  }

});

// TODO при нажатии отбирать карты из общей колоды отдельно по стадиям
// TODO при нажатии показывать рубашку карты
