const people = [
  ['John', 'Doe', 30],
  ['Jane', 'Doe', 25],
];

people.push(['Alice', 'Doe', 25]); // adiciona um novo elemento ao final do array
const john = people[0]; // acessa o primeiro elemento do array
people.pop(); // remove o último elemento do array

const { 0: firstName, 1: lastName, 2: age } = john;

console.log(firstName, lastName, age);
