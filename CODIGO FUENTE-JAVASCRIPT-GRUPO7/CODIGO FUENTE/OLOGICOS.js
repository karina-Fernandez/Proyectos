
let a = true;
let b = false;
let c = true;

// Operador AND (&&): Devuelve true solo si ambas condiciones son verdaderas
let andResult = a && c;  // true porque ambas son verdaderas
console.log("Resultado AND (&&):", andResult); // true

// Operador OR (||): Devuelve true si al menos una de las condiciones es verdadera
let orResult = a || b;  // true porque 'a' es verdadera
console.log("Resultado OR (||):", orResult); // true

// Operador NOT (!): Invierte el valor de la condición
let notResult = !b;  // true porque 'b' es false, y al aplicar NOT se convierte en true
console.log("Resultado NOT (!):", notResult); // true

// Combinación de los tres operadores
let combinedResult = (a && c) || !b;  // (true && true) || !false -> true || true -> true
console.log("Combinación de AND, OR y NOT:", combinedResult); // true
