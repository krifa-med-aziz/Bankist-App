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

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2024-12-18T21:31:17.178Z',
    '2024-11-18T07:42:02.383Z',
    '2025-02-15T09:15:04.904Z',
    '2025-03-02T10:17:24.185Z',
    '2025-01-09T14:11:59.604Z',
    '2025-02-24T17:01:17.194Z',
    '2025-05-20T23:36:17.929Z',
    '2025-04-01T10:51:36.790Z',
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

const btnLogin = document.querySelector('.login__btn');
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

const now = new Date();
const day = `${now.getDay()}`.padStart(2, 0);
const month = `${now.getMonth()}`.padStart(2, 0);
const year = now.getFullYear();
const heure = now.getHours();
const minute = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${month}/${day}/${year} ${heure}:${minute} `;

const displayMouvements = function (acc, sort = false) {
  const movs = sort ? acc.movements.toSorted((a, b) => a - b) : acc.movements;
  containerMovements.innerHTML = ' ';
  movs.forEach(function (mov, i) {
    const date = new Date(acc.movementsDates.at(i));
    console.log(date);
    const day = `${date.getDay()}`.padStart(2, 0);
    const month = `${date.getMonth()}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${month}/${day}/${year}`;
    const type = mov < 0 ? 'withdrawal' : 'deposit';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)}DT</div>
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
  labelBalance.textContent = `${acc.balance.toFixed(2)}DT`;
};

const calculDisplaySummary = function (account) {
  const summaryValueIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
  labelSumIn.textContent = `${summaryValueIn}DT`;
  const summaryValueOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
    .toFixed(2);
  labelSumOut.textContent = `${Math.abs(summaryValueOut)}DT`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0)
    .toFixed(2);
  labelSumInterest.textContent = `${interest}DT`;
};
const updateUI = acc => {
  calcDisplayBalance(acc);
  calculDisplaySummary(acc);
  displayMouvements(acc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    containerApp.style = 'opacity : 1 ;';
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;
    updateUI(currentAccount);
  } else {
    alert('User Not Found');
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    alert('loan denied');
  }
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
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
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
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
    containerApp.style = 'opacity : 0 ;';
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMouvements(currentAccount, sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['TND', 'Dinard Tunisien'],
]);

/////////////////////////////////////////////////
