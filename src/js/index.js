import '../css/style.css';
import '../assets/mythicCardBackground.png';
import AncientsData from "../data/ancients";
import Difficulties from "../data/difficulties";

const container = document.querySelector('.container');
const ancientCards = document.querySelectorAll('.ancient-card');
const buttonUp = document.querySelector('.button-up');
const buttonDown = document.querySelector('.button-down');
const sectionElements = container.querySelectorAll('section');
const allStages = document.querySelectorAll('.stage');
const timeOut = 200;
let selectedAncient;
let ancient;
let selectedStage;
let stage;
let count = 0;
let offset = 0;

// slider
const getObjData = (arr, val) => {
  let res;
  arr.forEach((el, i) => {
    for (const key in el) {
      if (el[key] == val) res = el;
    }
  })
  return res;
}

const elementHeigt = (el) => el.offsetHeight;

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


document.addEventListener('click', (e) => {

  if (e.target.classList.contains('button-up')) {
    rollUp();
  }

  if (e.target.classList.contains('button-down')) {
    rollDown();
  }

  if (e.target.classList.contains('ancient-card')) {
    ancientCards.forEach((el) => el.classList.remove('active'));
    setTimeout(() => e.target.classList.toggle('active'), timeOut)
    rollDown();

    selectedAncient = e.target.getAttribute('id');

    ancient = getObjData(AncientsData, selectedAncient)
    console.log(ancient.name)

  }

  if (e.target.classList.contains('stage')) {
    allStages.forEach((el) => el.classList.remove('active'));
    setTimeout(() => e.target.classList.toggle('active'), timeOut)
    rollDown();

    selectedStage = e.target.getAttribute('id');
    stage = getObjData(Difficulties, selectedStage);
    console.log(stage.name)
  }

  if (e.target.classList.contains('shirt-img')) {
    console.log('shirt-img')
  }

});


// game

