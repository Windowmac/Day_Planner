//set day of the week
const weekDay = moment(moment(), 'dddd');
document.getElementById('currentDay').textContent = weekDay;

const workTimes = [9, 10, 11, 12, 1, 2, 3, 4, 5];

function createCalendar(times) {
  if (times.length <= 0) {
    return;
  }
  const liEl = document.createElement('div');
  liEl.classList.add('row', 'mb-3');
  const timerEl = document.createElement('div');
  timerEl.classList.add('col-2');
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
  buttonEl.classList.add('me-md-3', 'btn', 'btn-primary');
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add(
    'd-grid',
    'gap-2',
    'd-md-flex',
    'justify-content-md-end'
  );
  liEl.appendChild(buttonContainer);
  buttonContainer.appendChild(buttonEl);
  const containerEl = document.getElementById('main-content');
  containerEl.appendChild(liEl);
  createCalendar(times);
}

createCalendar(workTimes);
