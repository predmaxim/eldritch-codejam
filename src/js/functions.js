import AncientsData from "../data/ancients";
import Difficulties from "../data/difficulties";
import { brownCards, blueCards, greenCards } from "../data/mythicCards/index";
export {
  rollDown,
  rollUp,
  putDeck,
  newGame,
  changeCard,
};

const container = document.querySelector('.container');
const sectionElements = document.querySelectorAll('section');
const buttonUp = document.querySelector('.button-up');
const buttonDown = document.querySelector('.button-down');
const allDifficulties = document.querySelectorAll('.difficulty-level');

const allAncient = document.querySelectorAll('.ancient-card');
const deckImg = document.querySelector('.deck-img');
const info = document.querySelector('.info');

const firstStageGreenCard = document.querySelector('.first-stage .dot-green');
const firstStageBrownCard = document.querySelector('.first-stage .dot-brown');
const firstStageBlueCard = document.querySelector('.first-stage .dot-blue');

const secondStageGreenCard = document.querySelector('.second-stage .dot-green');
const secondStageBrownCard = document.querySelector('.second-stage .dot-brown');
const secondStageBlueCard = document.querySelector('.second-stage .dot-blue');

const thirdStageGreenCard = document.querySelector('.third-stage .dot-green');
const thirdStageBrownCard = document.querySelector('.third-stage .dot-brown');
const thirdStageBlueCard = document.querySelector('.third-stage .dot-blue');

const fs = document.querySelector('.first-stage p');
const ss = document.querySelector('.second-stage p');
const ts = document.querySelector('.third-stage p');

const timeOut = 200;

let greenCardsWithDifficulty = []; // массив объектов - все выбранные зеленые карты с определенной сложностью
let brownCardsWithDifficulty = []; // массив объектов - все выбранные коричневые карты с определенной сложностью
let blueCardsWithDifficulty = []; // массив объектов - все выбранные синие карты с определенной сложностью

let firstStageAllCardsInDeckAmount;// число - кол-во карт первой стадии
let secondStageAllCardsInDeckAmount;// число - кол-во карт второй стадии
let thirdStageAllCardsInDeckAmount;// число - кол-во карт третьей стадии

let allCardsInFirstStage = [];
let allCardsInSecondStage = [];
let allCardsInThirdStage = [];

let allStageGreenCardsToNeedAmount;// число - кол-во зеленых карт
let allStageBrownCardsToNeedAmount;// число - кол-во коричневых карт
let allStageBlueCardsToNeedAmount;// число - кол-во голубых карт

let greenCardsInFirstStage = [];
let greenCardsInSecondStage = [];
let greenCardsInThirdStage = [];

let brownCardsInFirstStage = [];
let brownCardsInSecondStage = [];
let brownCardsInThirdStage = [];

let blueCardsInFirstStage = [];
let blueCardsInSecondStage = [];
let blueCardsInThirdStage = [];

let ancient; // строка - данный древний
let difficulty; // строка - данная сложность
let selectedDifficulty;

let count = 0; // число - счетчик слойдера (секций)
let offset = 0; // число - сдвиг

let cardsInDeck = []; // array of objects cards in deck
let allCards = []; // array of objects cards

let missingCardsAmount = 0;
let cardsToNeed = 0;

let removed;

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
};

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
};

/**
 * @function getObjects
 * @param {array} arr - array contains objects when to find
 * @param {string} key - key to find
 * @param {string} val - value to find
 * @return {array} - return array of objects
 */
const getObjects = (arr, key, val, remove) => {
  if (remove) return arr.filter((obj) => obj[key] != val ? obj : false);
  else return arr.filter((obj) => obj[key] == val ? obj : false);
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
* @function getRandomCards
* @param {array} arr - array of card
* @param {string} dif - difficulty
* @param {number} amount - number of cards to need return
* @returns {array} - get random cards in range and return array of cards objects 
* */
const getRandomCards = (arr, dif, amount) => {
  let res = [];
  const сardsWithDifficulty = getObjects(arr, 'difficulty', dif);
  return random(сardsWithDifficulty.length - 1, amount).reduce((acc, cur) => {
    сardsWithDifficulty.forEach((el, i) => { 
      if (i == cur) res.push(el) 
    });
    return res;
  }, [])
};

/**
 * @function arrSlice
 * @param {array} arr - array to slice
 * @param {number} num - number of objects to return
 * @return {number} - returns sliced array of objects 
 */
const arrSlice = (arr, num) => {
  const r = random(arr.length - 1, num);
  return arr.filter((obj, idx) => {
    for (let i = 0; i < r.length; i++) {
      if (r[i] == idx) return obj;
    }
  })
};

/** 
 * @function putCardsInArr
 * @param {array} arr - array of objects to send
 * @param {array} StoreArr - storage array
 * @return {*} - keeps the deck
 */
const putCardsInArr = (arr, StoreArr) => arr.forEach((e) => StoreArr.push(e));

const checkCards = () => {
  // зеленые карты
  if (greenCardsWithDifficulty.length < allStageGreenCardsToNeedAmount) {

    missingCardsAmount = allStageGreenCardsToNeedAmount - greenCardsWithDifficulty.length; // кол-во

    putCardsInArr(greenCardsWithDifficulty, cardsInDeck);

    if (difficulty == 'easy') {
      cardsToNeed = getRandomCards(greenCards, 'normal', missingCardsAmount); // arr of obj
      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }

    if (difficulty == 'normal') {
      cardsToNeed = getRandomCards(
        getObjects(greenCards, 'difficulty', 'easy'),
        missingCardsAmount
      );
      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }

    if (difficulty == 'hard') {
      cardsToNeed = getRandomCards(greenCards, 'normal', missingCardsAmount); // arr of obj
      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }

  } else {
    putCardsInArr(getRandomCards(greenCards, difficulty, allStageGreenCardsToNeedAmount), cardsInDeck);
  }

  // коричневые карты
  if (brownCardsWithDifficulty.length < allStageBrownCardsToNeedAmount) {

    missingCardsAmount = allStageBrownCardsToNeedAmount - brownCardsWithDifficulty.length; // кол-во

    putCardsInArr(brownCardsWithDifficulty, cardsInDeck);

    if (difficulty == 'easy') {
      cardsToNeed = getRandomCards(brownCards, 'normal', missingCardsAmount); // arr of obj

      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsToNeed)
    }

    if (difficulty == 'normal') {
      cardsToNeed = getRandomCards(brownCards, 'easy', missingCardsAmount); // arr of obj

      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }

    if (difficulty == 'hard') {
      cardsToNeed = getRandomCards(brownCards, 'normal', missingCardsAmount); // arr of obj

      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }
  } else {
    putCardsInArr(getRandomCards(brownCards, difficulty, allStageBrownCardsToNeedAmount), cardsInDeck);
  }

  // голубые карты
  if (blueCardsWithDifficulty.length < allStageBlueCardsToNeedAmount) {

    missingCardsAmount = allStageBlueCardsToNeedAmount - blueCardsWithDifficulty.length; // кол-во

    putCardsInArr(blueCardsWithDifficulty, cardsInDeck);

    if (difficulty == 'easy') {
      cardsToNeed = getRandomCards(blueCards, 'normal', missingCardsAmount); // arr of obj

      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }

    if (difficulty == 'normal') {
      cardsToNeed = getRandomCards(blueCards, 'easy', missingCardsAmount); // arr of obj

      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }

    if (difficulty == 'hard') {
      cardsToNeed = getRandomCards(blueCards, 'normal', missingCardsAmount); // arr of obj

      putCardsInArr(cardsToNeed, cardsInDeck);
      // console.log(cardsInDeck)
    }
  } else {
    putCardsInArr(getRandomCards(blueCards, difficulty, allStageBlueCardsToNeedAmount), cardsInDeck);
  }
}

const formDeck = () => {

  greenCardsInFirstStage = arrSlice(getObjects(cardsInDeck, 'color', 'green'), ancient.firstStage.greenCards);
  brownCardsInFirstStage = arrSlice(getObjects(cardsInDeck, 'color', 'brown'), ancient.firstStage.brownCards);
  blueCardsInFirstStage = arrSlice(getObjects(cardsInDeck, 'color', 'blue'), ancient.firstStage.blueCards);

  greenCardsInSecondStage = arrSlice(getObjects(cardsInDeck, 'color', 'green'), ancient.secondStage.greenCards);
  brownCardsInSecondStage = arrSlice(getObjects(cardsInDeck, 'color', 'brown'), ancient.secondStage.brownCards);
  blueCardsInSecondStage = arrSlice(getObjects(cardsInDeck, 'color', 'blue'), ancient.secondStage.blueCards);

  greenCardsInThirdStage = arrSlice(getObjects(cardsInDeck, 'color', 'green'), ancient.thirdStage.greenCards);
  brownCardsInThirdStage = arrSlice(getObjects(cardsInDeck, 'color', 'brown'), ancient.thirdStage.brownCards);
  blueCardsInThirdStage = arrSlice(getObjects(cardsInDeck, 'color', 'blue'), ancient.thirdStage.blueCards);

  putCardsInArr(greenCardsInFirstStage,allCardsInFirstStage);
  putCardsInArr(greenCardsInSecondStage,allCardsInSecondStage);
  putCardsInArr(greenCardsInThirdStage,allCardsInThirdStage);

  putCardsInArr(brownCardsInFirstStage,allCardsInFirstStage);
  putCardsInArr(brownCardsInSecondStage,allCardsInSecondStage);
  putCardsInArr(brownCardsInThirdStage,allCardsInThirdStage);

  putCardsInArr(blueCardsInFirstStage,allCardsInFirstStage);
  putCardsInArr(blueCardsInSecondStage,allCardsInSecondStage);
  putCardsInArr(blueCardsInThirdStage,allCardsInThirdStage);

  putCardsInArr(allCardsInFirstStage,allCards);
  putCardsInArr(allCardsInSecondStage,allCards);
  putCardsInArr(allCardsInThirdStage,allCards);
}

/**
 * @function newGame
 * @return {*} - hide info and clear stages
 * */
const newGame = (target) => {
  allCardsInFirstStage = [];
  allCardsInSecondStage = [];
  allCardsInThirdStage = [];
  allCards = [];
  cardsInDeck = [];

  if (target.classList.contains('ancient-card')) {

    allAncient.forEach((el) => el.classList.remove('active'));
    if (selectedDifficulty) selectedDifficulty.classList.remove('active');

    ancient = getObjects(AncientsData, 'id', target.id)[0];

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

  if (target.classList.contains('difficulty-level')) {

    allDifficulties.forEach((el) => el.classList.remove('active'));
    selectedDifficulty = target;

    difficulty = getObjects(Difficulties, 'id', target.id)[0].id;

    greenCardsWithDifficulty = getObjects(greenCards, 'difficulty', difficulty); // массив объектов - все выбранные зеленые карты с определенной сложностью
    brownCardsWithDifficulty = getObjects(brownCards, 'difficulty', difficulty); // массив объектов - все выбранные коричневые карты с определенной сложностью
    blueCardsWithDifficulty = getObjects(blueCards, 'difficulty', difficulty); // массив объектов - все выбранные синие карты с определенной сложностью

    checkCards();
    formDeck();

  }

  target.classList.toggle('active');
  deckImg.setAttribute('src', 'assets/mythicCardBackground.png');
  info.classList.add('dispnone');
  fs.style.textShadow = '';
  fs.style.color = '';
  ss.style.textShadow = '';
  ss.style.color = '';
  ts.style.textShadow = '';
  ts.style.color = '';

};

const stageComplete = (stage) => {
  stage.style.textShadow = '0px 0px 35px red';
  stage.style.color = '#ff6d6d';
}

/**
 * @function putDeck
 * @return {*} - put the deck in its place
 * */
const putDeck = () => {
  firstStageGreenCard.textContent = ancient.firstStage.greenCards;
  secondStageGreenCard.textContent = ancient.secondStage.greenCards;
  thirdStageGreenCard.textContent = ancient.thirdStage.greenCards;

  firstStageBrownCard.textContent = ancient.firstStage.brownCards;
  secondStageBrownCard.textContent = ancient.secondStage.brownCards;
  thirdStageBrownCard.textContent = ancient.thirdStage.brownCards;

  firstStageBlueCard.textContent = ancient.firstStage.blueCards;
  secondStageBlueCard.textContent = ancient.secondStage.blueCards;
  thirdStageBlueCard.textContent = ancient.thirdStage.blueCards;
};

const changeCard = () => {

  if (allCardsInFirstStage.length > 0) {

    removed = arrSlice(allCardsInFirstStage, 1)[0];

    allCardsInFirstStage = getObjects(allCardsInFirstStage, 'id', removed.id, 'remove')
    deckImg.setAttribute('src', removed.cardFace);

    if ((removed.id).includes('green')) {
      firstStageGreenCard.innerText = firstStageGreenCard.innerText - 1 || 0;
    }
    if ((removed.id).includes('brown')) {
      firstStageBrownCard.innerText = firstStageBrownCard.innerText - 1 || 0;
    }
    if ((removed.id).includes('blue')) {
      firstStageBlueCard.innerText = firstStageBlueCard.innerText - 1 || 0;
    }

  } else if (allCardsInSecondStage.length > 0) {

    removed = arrSlice(allCardsInSecondStage, 1)[0];

    allCardsInSecondStage = getObjects(allCardsInSecondStage, 'id', removed.id, 'remove')
    deckImg.setAttribute('src', removed.cardFace);

    if ((removed.id).includes('green')) {
      secondStageGreenCard.innerText = secondStageGreenCard.innerText - 1 || 0;
    }
    if ((removed.id).includes('brown')) {
      secondStageBrownCard.innerText = secondStageBrownCard.innerText - 1 || 0;
    }
    if ((removed.id).includes('blue')) {
      secondStageBlueCard.innerText = secondStageBlueCard.innerText - 1 || 0;
    }

  } else if (allCardsInThirdStage.length > 0) {

    removed = arrSlice(allCardsInThirdStage, 1)[0];

    allCardsInThirdStage = getObjects(allCardsInThirdStage, 'id', removed.id, 'remove')
    deckImg.setAttribute('src', removed.cardFace);

    if ((removed.id).includes('green')) {
      thirdStageGreenCard.innerText = thirdStageGreenCard.innerText - 1 || 0;
    }

    if ((removed.id).includes('brown')) {
      thirdStageBrownCard.innerText = thirdStageBrownCard.innerText - 1 || 0;
    }

    if ((removed.id).includes('blue')) {
      thirdStageBlueCard.innerText = thirdStageBlueCard.innerText - 1 || 0;
    }

  }

  if (allCardsInFirstStage.length == 0) stageComplete(fs);
  if (allCardsInSecondStage.length == 0) stageComplete(ss);
  if (allCardsInThirdStage.length == 0) {
    stageComplete(ts);
    info.classList.remove('dispnone');
  }


}

