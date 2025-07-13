let x = 10;
let y = 5;
let z = '10';

// Igualdad débil (==)
let igual = x == z;  // true, porque 10 es igual a '10' (en tipo string, pero ambos valores son equivalentes)
console.log("Igualdad débil (==):", igual); // true

// Desigualdad (!=)
let desigual = x != y;  // true, porque 10 no es igual a 5
console.log("Desigualdad (!=):", desigual); // true

// Mayor que (>)
let mayor = x > y;  // true, porque 10 es mayor que 5
console.log("Mayor que (>):", mayor); // true

// Menor que (<)
let menor = y < x;  // true, porque 5 es menor que 10
console.log("Menor que (<):", menor); // true

// Mayor o igual (>=)
let mayorIgual = x >= y;  // true, porque 10 es mayor o igual que 5
console.log("Mayor o igual (>=):", mayorIgual); // true

// Menor o igual (<=)
let menorIgual = y <= x;  // true, porque 5 es menor o igual que 10
console.log("Menor o igual (<=):", menorIgual); // true

// Comparación estricta (===)
let estrictaIgual = x === z;  // false, porque aunque ambos sean 10, 'x' es un número y 'z' es un string
console.log("Comparación estricta (===):", estrictaIgual); // false

// Comparación estricta de desigualdad (!==)
let estrictaDesigual = x !== z;  // true, porque el tipo de x es diferente al de z
console.log("Comparación estricta de desigualdad (!==):", estrictaDesigual); // true
