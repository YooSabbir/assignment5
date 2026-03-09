
1. Difference between var, let, and const:

var → An older way to declare variables. 
let → Can be updated but not re-declared.  
const → Cannot be updated or re-declared after it has been assigned.

2. What is the spread operator (...)?
The spread operator expands the elements of an array or object.

Example:

const arr1 = [1, 2];  
const arr2 = [...arr1, 3, 4];

3. Difference between map(), filter(), and forEach():

map() → Creates a new array by transforming each element.  
filter() → Creates a new array with elements that meet a condition.  
forEach() → Loops through the array but does not return a new array.

4. What is an arrow function?
Arrow function offers a shorter way to write functions in JavaScript.

Example:

const add = (a, b) => a + b;

5. What are template literals?
Template literals let you insert variables inside a string using backticks ` ` and ${}.

Example:

const name = "RAFI";  
console.log(`Hello ${name}`);