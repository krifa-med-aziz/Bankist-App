'use strict';
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2024-02-02T10:51:36.790Z',
    '2024-07-28T23:36:17.929Z',
    '2024-08-01T10:17:24.185Z',
    '2024-09-28T09:15:04.904Z',
    '2024-11-18T21:31:17.178Z',
    '2024-12-23T07:42:02.383Z',
    '2025-02-02T17:01:17.194Z',
    '2025-02-04T14:11:59.604Z',
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2024-02-02T10:51:36.790Z',
    '2024-07-28T23:36:17.929Z',
    '2024-08-01T10:17:24.185Z',
    '2024-09-28T09:15:04.904Z',
    '2024-11-18T21:31:17.178Z',
    '2024-12-23T07:42:02.383Z',
    '2025-02-02T17:01:17.194Z',
    '2025-02-04T14:11:59.604Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2024-11-18T21:31:17.178Z',
    '2024-12-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-04-01T10:17:24.185Z',
    '2025-02-08T14:11:59.604Z',
    '2025-03-26T17:01:17.194Z',
    '2025-03-28T23:36:17.929Z',
    '2025-05-01T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2024-12-18T21:31:17.178Z',
    '2025-02-15T09:15:04.904Z',
    '2025-03-02T10:17:24.185Z',
    '2025-02-24T17:01:17.194Z',
    '2025-04-01T10:51:36.790Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const btnLogin = document.querySelector('.login__btn');
const btnLogOut = document.querySelector('.logOut__btn');
const btnback = document.querySelector('.back__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const local = navigator.language;
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};

const formatMovementDate = function (date) {
  const calcdaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const dayPassed = calcdaysPassed(new Date(), date);
  if (dayPassed === 0) return 'Today';
  else if (dayPassed === 1) return 'Yesterday';
  else if (dayPassed <= 7) return `${dayPassed} Days Ago`;
  else return new Intl.DateTimeFormat(local).format(date);
};

let currentAccount, timer;

const resetTimer = () => {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};

const formatCur = function (value, local, currency) {
  return new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const startLogOutTimer = function () {
  const tick = () => {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style = 'opacity : 0 ;';
      nav.classList.remove('hidden');
      header.classList.add('hidden');
    }
    time--;
  };
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const displayMouvements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movDate: new Date(acc.movementsDates.at(i)),
  }));
  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);
  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movDate } = obj;
    const date = formatMovementDate(movDate);
    const type = movement < 0 ? 'withdrawal' : 'deposit';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${formatCur(movement, local, 'TND')}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const creatUsernames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};
creatUsernames(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr);
  labelBalance.textContent = `${formatCur(acc.balance, local, 'TND')}`;
};

const calculDisplaySummary = function (account) {
  const summaryValueIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
  labelSumIn.textContent = `${formatCur(summaryValueIn, local, 'TND')}`;
  const summaryValueOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
    .toFixed(2);
  labelSumOut.textContent = `${formatCur(
    Math.abs(summaryValueOut),
    local,
    'TND'
  )}`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0)
    .toFixed(2);
  labelSumInterest.textContent = `${formatCur(interest, local, 'TND')}`;
};
const updateUI = acc => {
  calcDisplayBalance(acc);
  calculDisplaySummary(acc);
  displayMouvements(acc);
};

btnback.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = '../Home/index.html';
});

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  nav.classList.add('hidden');
  resetTimer();
  // Create current date and time
  labelDate.textContent = new Intl.DateTimeFormat(local, options).format(
    new Date()
  );
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    containerApp.style = 'opacity : 1 ;';
    header.classList.remove('hidden');
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;
    updateUI(currentAccount);
  } else {
    alert('User Not Found');
    nav.classList.remove('hidden');
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
  }
});

btnLogOut.addEventListener('click', e => {
  e.preventDefault();
  header.classList.add('hidden');
  nav.classList.remove('hidden');
  containerApp.style = 'opacity : 0 ;';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  resetTimer();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    setTimeout(() => {
      currentAccount.movementsDates.push(new Date().toISOString());
      currentAccount.movements.push(amount);
      updateUI(currentAccount);
    }, 3000);
  } else {
    alert('loan denied');
  }
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  resetTimer();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    setTimeout(() => {
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      receiverAcc.movements.push(amount);
      currentAccount.movements.push(-amount);
      updateUI(currentAccount);
    }, 3000);
    inputTransferAmount.value = inputTransferTo.value = '';
  } else {
    alert('transaction denied');
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    inputCloseUsername.value = inputClosePin.value = '';
    accounts.splice(index, 1);
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style = 'opacity : 0 ;';
    nav.classList.remove('hidden');
    header.classList.add('hidden');
  }
});

let sorted = true;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMouvements(currentAccount, sorted);
  displayMouvements(currentAccount, sorted);
  sorted = !sorted;
});
