import './assets/scss/main.scss';
//<СЕТКА>===============================================================================================================


//<ДРОПДАУН>============================================================================================================
const lists = document.querySelectorAll('._list')
lists.forEach((list) => {
  list.addEventListener('click', (event) => {
    event.stopPropagation();
    list.classList.toggle('open');
  })
})

//<ВРЕМЕННАЯ ШКАЛА>=====================================================================================================
const displayButton = document.querySelector('.time-nav__button');
const timelineContainer = document.querySelector('.timeline__container');

displayButton.addEventListener('click', generateTimelineData);

function generateTimelineData() {
  const yearInput = document.querySelector('.time-nav__input[name="year"]');
  const quarterInput = document.querySelector('.time-nav__input[name="quarter"]');
  const selectedYear = parseInt(yearInput.value);
  const selectedQuarter = parseInt(quarterInput.value);
  const startDate = new Date(selectedYear, (selectedQuarter - 1) * 3, 1);
  const endDate = new Date(selectedYear, selectedQuarter * 3, 0);

  const timelineData = [];

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const week = Math.ceil(((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 + 1) / 7);
    const day = currentDate.getDate();

    let monthData = timelineData.find((item) => item.month === month);
    if (!monthData) {
      monthData = {
        month: month,
        weeks: []
      };
      timelineData.push(monthData);
    }

    let weekData = monthData.weeks.find((item) => item[`${week} неделя`]);
    if (!weekData) {
      weekData = {
        [`${week} неделя`]: []
      };
      monthData.weeks.push(weekData);
    }

    weekData[`${week} неделя`].push(day);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(timelineData);

  function renderMonth() {
    let listItem = '';
    listItem += '<div class="_row">';
    timelineData.forEach((item) => {
      listItem += `<div class="_column timeline__mounth">${item.month}`;
      listItem += '<div class="_row">';
      item.weeks.forEach((weekObj) => {
        const weekKey = Object.keys(weekObj)[0];
        listItem += `<div class="_column timeline__weak">${weekKey}`;
        listItem += '<div class="_row">';
        const days = weekObj[weekKey];
        days.forEach((day) => {
          listItem += `<div class="_column timeline__day">${day}</div>`;
        });
        listItem += '</div>';
        listItem += '</div>';
      });
      listItem += '</div>';
      listItem += '</div>';
    });
    listItem += '</div>';
    timelineContainer.innerHTML = listItem;
  }

  renderMonth();
}

//<ФУНКЦИЯ>=============================================================================================================
function checkAndExecute(checkFunction, callbackFunction, options = {}) {
  const frequency = options.frequency || 1000;
  const timeout = options.timeout || 5000;

  let elapsedTime = 0;
  const intervalId = setInterval(() => {
    const result = checkFunction();
    elapsedTime += frequency;

    if (result === true) {
      clearInterval(intervalId);
      callbackFunction();
    } else if (elapsedTime >= timeout) {
      clearInterval(intervalId);
      console.log('Максимальное время ожидания. Нет значений больше 0,8');
    }
  }, frequency);
}

function checkFunction() {
  const randomNumber = Math.random();
  console.log(randomNumber);
  return randomNumber > 0.8;
}

function callbackFunction() {
  console.log('Функция поймала значение больше 0.8!');
}

checkAndExecute(checkFunction, callbackFunction, {
  frequency: 2000,
  timeout: 10000,
});


const checkAndExecuteFunc = document.getElementById('checkAndExecuteFunc');
const checkFunctionFunk = document.getElementById('checkFunctionFunk');
const callbackFunctionFunk = document.getElementById('callbackFunctionFunk');
const checkAndExecuteFunk = document.getElementById('checkAndExecuteFunk');

checkAndExecuteFunc.textContent = `function checkAndExecute(checkFunction, callbackFunction, options = {}) {
  const frequency = options.frequency || 1000;
  const timeout = options.timeout || 5000;

  let elapsedTime = 0;
  const intervalId = setInterval(() => {
    const result = checkFunction();
    elapsedTime += frequency;

    if (result === true) {
      clearInterval(intervalId);
      callbackFunction();
    } else if (elapsedTime >= timeout) {
      clearInterval(intervalId);
      console.log('Максимальное время ожидания. Нет значений больше 0,8');
    }
  }, frequency);
}`;
checkFunctionFunk.textContent = `function checkFunction() {
  const randomNumber = Math.random();
  console.log(randomNumber);
  return randomNumber > 0.8;
}`;
callbackFunctionFunk.textContent = `function callbackFunction() {
  console.log('Функция поймала значение больше 0.8!');
}`;
checkAndExecuteFunk.textContent = `checkAndExecute(checkFunction, callbackFunction, {
  frequency: 2000,
  timeout: 10000,
});`;

Prism.highlightElement(checkAndExecuteFunc);
Prism.highlightElement(checkFunctionFunk);
Prism.highlightElement(callbackFunctionFunk);
Prism.highlightElement(checkAndExecuteFunk);

//<ДРАГНДРОП>===========================================================================================================
const scaleUnits = document.querySelectorAll('.scale__unit');
const scaleSliders = document.querySelectorAll('.scale__slider');
const scaleButton = document.querySelector('.scale__button');
let draggedSlider = null;

for (let scaleSlider of scaleSliders) {
  scaleSlider.addEventListener('dragstart', dragstart);
  scaleSlider.addEventListener('dragend', dragend);
}

for (const scaleUnit of scaleUnits) {
  scaleUnit.addEventListener('dragover', dragover),
  scaleUnit.addEventListener('dragenter', dragenter),
  scaleUnit.addEventListener('dragleave', dragleave),
  scaleUnit.addEventListener('drop', dragdrop)
}

function dragstart(event) {
  draggedSlider = event.target; // Store the dragged slider element in the variable
  setTimeout(() => draggedSlider.classList.add('hide'), 0);
}

function dragend(event) {
  draggedSlider.classList.remove('hide');
}

function dragover(event) {
  event.preventDefault();
}

function dragenter(event) {
  event.target.classList.add('hovered');
}

function dragleave(event) {
  event.target.classList.remove('hovered');
}

function dragdrop(event) {
  if (event.target.classList.contains('scale__unit')) {
    event.target.appendChild(draggedSlider); // Use the variable to append the dragged slider
    draggedSlider.classList.remove('hide');
    event.target.classList.remove('hovered');
  }
}

function moveSliderToPreviousSibling(slider) {
  const previousSibling = slider.parentElement.previousElementSibling;
  if (previousSibling !== null && previousSibling.classList.contains('scale__unit')) {
    previousSibling.appendChild(slider);
  } else {
    clearInterval(slider.interval);
  }
}

scaleButton.addEventListener('click', () => {
  for (let scaleSlider of scaleSliders) {
    let currentPosition = parseInt(scaleSlider.parentElement.id.split('-')[2]);
    scaleSlider.interval = setInterval(() => {
      if (currentPosition > 1) {
        currentPosition -= 1;
        moveSliderToPreviousSibling(scaleSlider);
      } else {
        clearInterval(scaleSlider.interval);
      }
    }, 1000);
  }
});