import style from "./style.css";
console.log("Hola mundo sin configuración con Webpack");
const arr = [1, 2, 3],
  codeESNext = () => console.log(...arr);

codeESNext();
const d = document
d.getElementById('app').innerHTML = 'Webpack'