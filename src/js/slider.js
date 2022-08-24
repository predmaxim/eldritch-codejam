export { rollUp, rollDown, count }

const container = document.querySelector('.container');
const ancientCards = document.querySelectorAll('.ancient-card');
const buttonUp = document.querySelector('.button-up');
const buttonDown = document.querySelector('.button-down');
const sectionElements = container.querySelectorAll('section');
const stage = document.querySelectorAll('.stage');
const timeOut = 200;
let count = 0;
let offset = 0;

const currentElementHeigt = (el) => el.offsetHeight;

const rollDown = () => {
  count += 1;
  offset = count * currentElementHeigt(sectionElements[count - 1]);

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
  offset = -count * currentElementHeigt(sectionElements[count]);

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
  }

  if (e.target.classList.contains('stage')) {
    stage.forEach((el) => el.classList.remove('active'));
    setTimeout(() => e.target.classList.toggle('active'), timeOut)
    rollDown();
  }

  if (e.target.classList.contains('shirt-img')) {
    console.log('shirt-img')
  }

});

