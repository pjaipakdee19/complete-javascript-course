'strict mode'

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 400;
// budget[9] = 'aaa';
// console.log(budget);

console.log(budget);
//freeze for immutability
const spendingLimits = Object.freeze ({
  jonas: 1500,
  matilda: 10000,
});
spendingLimits.jay = 200;
console.log(spendingLimits);
//{jonas: 1500, matilda: 100} stay the same because of freeze

const getLimit = (limits,user) => limits?.[user] ?? 0;


const addExpense = function (state, limits, value, description, user = 'jonas') {
  
  const cleanUser = user.toLowerCase();

  return (value <= getLimit(limits, cleanUser)) ?
    [...state, { value: -value, description, user }]
  : state
  // budget.push({ value: -value, description, user }); // function should not directly mutate object outside function
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(budget);
console.log(newBudget3);

// const checkExpense2 = function (state, limits) {
//   // for (const entry of newBudget3) {
//   //   if (entry.value <= -getLimit(entry.user)) {
//   //     entry.flag = 'limit';
//   //   }
//   // }
//   return state.map(entry => {
//     return entry.value <= -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry;
//   });
// };

const checkExpense = (state, limits) =>
  state.map(entry => {
    return entry.value <= -getLimit(entry.user) ? {...entry, flag: 'limit'} : entry;
  });


const finalBudget = checkExpense(newBudget3, spendingLimits);
console.log(finalBudget);

// const logBigExpenses = function (bigLimit) {
//   let output = '';
//   for (const entry of budget) {
//     output += entry.value <= -bigLimit ?  `${entry.description.slice(-2) + ' / '}` : '';
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state.filter(entry => entry.value <= -bigLimit)
  .map(entry => entry.description.slice(-2))
  .join('/');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);
};




logBigExpenses(finalBudget, 500);