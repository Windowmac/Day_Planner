//set day of the week
const weekDay = moment(moment(), 'dddd');
document.getElementById('currentDay').textContent = weekDay;
document.getElementById('currentDay').classList.add('time-block');

const workTimes = [9, 10, 11, 12, 1, 2, 3, 4, 5];
const workLength = workTimes.length;
let timeCount = 0;

function createCalendar(times) {
  if (!times.length) {
    return;
  }
  const liEl = document.createElement('div');
  liEl.classList.add('row', 'mb-3');

  const timerEl = document.createElement('div');
  timerEl.classList.add('col-2', 'align-self-center', 'text-end');
  const time = times.shift();
  timerEl.textContent = `${time}:00`;
  liEl.appendChild(timerEl);

  const memoEl = document.createElement('textarea');
  memoEl.classList.add('col-8', 'form-control');
  memoEl.rows = '3';
  liEl.appendChild(memoEl);

  const buttonEl = document.createElement('button');
  buttonEl.type = 'button';
  buttonEl.textContent = 'Save';
  buttonEl.classList.add('me-md-3', 'btn', 'btn-primary', 'saveBtn');
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add(
    'd-grid',
    'gap-2',
    'd-md-flex',
    'justify-content-md-end'
  );
  // const svgIcon = document.createElement('i');
  // svgIcon.classList.add('bi', 'bi-save');
  // console.log(svgIcon);
  liEl.appendChild(buttonContainer);
  buttonContainer.appendChild(buttonEl);

  const containerEl = document.getElementById('main-content');
  containerEl.appendChild(liEl);
  memoEl.value = getStorage();
  buttonEl.addEventListener('click', handleSave);

  //storage is going to be stored as an array of strings, and retrieved as such. 0 being the first hour, shifting along with workTimes
  //attempt to retrieve local storage calendar
  //if no calendar is available, create one, using an array of empty strings
  //if there is a calendar available, store it as an array of strings
  //copy array index at hour
  //return the copy as memoContent
  function getStorage() {
    if (!localStorage.getItem('work-list')) {
      const newUserArray = [];
      for (i = 0; i < workLength; i++) {
        newUserArray.push('');
      }
      localStorage.setItem('work-list', JSON.stringify(newUserArray));
    }
    const storageArray = JSON.parse(localStorage.getItem('work-list'));
    while (storageArray.length < workLength) {
      storageArray.push('');
    }
    const memoContent = storageArray[timeCount];
    return memoContent;
  }
  //load each element's text value into an array
  //save that array as a JSON string
  function handleSave() {
    const saveElements = document.getElementsByTagName('textarea');
    const saveArray = [];
    for (let i = 0; i < saveElements.length; i++) {
      saveArray[i] = saveElements[i].value;
    }
    localStorage.setItem('work-list', JSON.stringify(saveArray));
  }

  handleColor();

  function handleColor() {
    const currentTime = moment(moment(), 'h');
    const calendarTime = moment(time, 'h');
    if (calendarTime.isBefore(currentTime)) {
      memoEl.classList.add('past');
    } else if (calendarTime.isAfter(currentTime)) {
      memoEl.classList.add('future');
    } else {
      memoEl.classList.add('present');
    }
  }

  timeCount++;
  createCalendar(times);
}

createCalendar(workTimes);

const clearBtnEl = document.getElementById('clear-button');
clearBtnEl.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
