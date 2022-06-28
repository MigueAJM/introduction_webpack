# WEBPACK
Es un empaquetador de archivos para aplicaciones JavaScript modernas, totalmente configurable y a diferencia de los Task Runners (como Grunt y Gulp) donde los procesos se gestionan de forma separada, en Webpack, se conoce el origen y todo se compila en un único archivo.
Crea una gráfica de todas las dependencias de la aplicación. Tiene un archivo de configuración, denominado webpack.config.js, donde se define todo el proceso de construcción en un objeto JS.
Webpack tiene 4 conceptos clave:
-Entry: Indica cuál es el punto(s) de entrada.
-Output: Indica cuál es el punto(s) de salida.
-Loaders: Realizan transformaciones en los archivos.
-Plugins: Realizan acciones en los archivos.
## Sin configuración
### Crear nuevo directorio y colocarse en el:
`> mkdir my_directory`
`> cd my_directory`
### Iniciar proyecto Node:
`> npm init`
### Instalar Webpack y su cli:
`> npm i -D webpack webpack-cli`
### En el package.json agrega el siguiente comando:
`
"scripts" : {
    "build" : "webpack"
}
`
### Ejecutar el comando:
`> npm run build`
El comando lanzara un error:
`> ERROR in Entry module not found: Error: Can't resolve './src' in '~/my_directory'`
Webpack está buscando un punto de entrada en ./src 😱😱😱¡¡¡ Sin Archivo de configuración !!!

A partir de la versión 4 no es necesario definir el punto de entrada, tomará ./src/index.js como valor predeterminado 🤓.

En versiones anteriores, el punto de entrada debe definirse dentro del archivo de configuración denominado webpack.config.js.
### Crear archivo ./src/index.js y escribe:
`console.log('ola mundo sin configuración con Webpack')`
Ejecuta nuevamente el comando build y Webpack en automático nos habrá generado el archivo de salida ./dist/main,js 😱😱😱

## Modos
### Producción y desarrollo
En Webpack un patrón común es tener 2 archivos de configuración uno para las tareas de desarrollo y otro para las de producción.

Mientras que para proyectos grandes aún se pueden necesitar 2 archivos, en proyectos pequeños , es posible especificar el tipo de configuración en una sola línea de configuración.

Desde la versión 4 se introdujo el modo de producción y el modo de desarrollo.

De hecho cuando corrimos el comando build la terminal nos mando un mensaje de advertencia:
`
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
`
La opción 'modo' no se ha configurado. Establezca la opción 'modo' en 'desarrollo' o 'producción' para habilitar los valores predeterminados para este entorno.

Vamos a crear un comando para cada ambiente:
`
"scripts" : {
    "dev" : "webpack --mode development" ,
    "build" : "webpack --mode production"
}
`
Ejecutemos ambos comandos y miremos el archivo ./dist/main.js después de ejecutarlos:

npm run dev generará un archivo indentado y con comentarios.
npm run build generará un archivo minificado y sin comentarios.
Modificando puntos de entrada y salida predeterminados:
`
"scripts": {
    "dev": "webpack --mode development --entry ./foo/src/index.js --output-path ./foo/dist",
    "build": "webpack --mode production --entry ./foo/src/index.js --output-path ./foo/dist"
}
`

## Transpilando JS con Babel
Webpack por sí sólo no sabe como transpilar código ESNext, pero tiene un loader que lo hace.
### Instala babel-loader y sus dependencias:
`> npm i -D babel-loader @babel/core @babel/preset-env`
### Ahora crea el archivo .babelrc con el siguiente código:
`
{
  "presets": ["@babel/preset-env"]
}
`
### Escribe el siguiente código en tu archivo ./src/index.js
`
const arr = [1, 2, 3],
  codeESNext = () => console.log(...arr);

codeESNext();
`
### Crea el archivo webpack.config.js y escribe el siguiente código:
`
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
`
Ejecutemos los comandos dev y build y miremos el archivo ./dist/main.js después de ejecutarlos:_

npm run dev transpiló el archivo con sintaxis ESNext a ES5 indentado y con comentarios, gracias a la configuración del archivo webpack.config.js.
npm run build transpiló el archivo con sintaxis ESNext a ES5 minificado y sin comentarios, gracias a la configuración del archivo webpack.config.js.
## Inyección de JS en HTML
Para inyectar el código dinámico que genera Webpack en los archivos HTML, necesita 2 dependencias : html-webpack-plugin y html-loader.
### Instala las dependencias:
`> npm i -D html-webpack-plugin html-loader`
### Agrega la siguiente regla al archivo webpack.config.js:
`
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
};
`
### Ahora crea el archivo ./src/index.html:
`
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`
Ejecutemos los comandos dev o build y miremos el archivo ./dist/index.html después de ejecutarlos.

No es necesario incluir el JavaScript dentro del archivo HTML, Webpack lo ha inyectado automáticamente y ha minificado el código 😎.
## Extracción de CSS
Webpack por sí sólo no sabe como extraer código CSS en un archivo externo, pero tiene un loader y un plugin que lo hace.
### Instala las dependencias:
`> npm i -D mini-css-extract-plugin css-loader`
### Agrega la siguiente regla al archivo webpack.config.js:
`
const HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
`
### Ahora crea el archivo ./src/style.css con algo de código:
`
html {
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 16px;
  color: #8dd6f9;
  background-color: #2b3a42;
}
`
### Ahora importamos los estilos desde el punto de entrada, el archivo ./src/index.js:
`import style from "./style.css";`
Ejecutemos los comandos dev o build y miremos el archivo ./dist/index.html después de ejecutarlos.

No es necesario incluir el CSS dentro del archivo HTML, Webpack lo ha inyectado automáticamente y ha creado el archivo de estilos main.css 😎.
## Servidor Web de Desarrollo
No es muy óptimo estar ejecutando el comando dev cada vez que hacemos un cambio en nuestra aplicación lo ideal es configurar un servidor web de prueba que en automático recompile nuestro código y recargue el navegador.

Webpack, cuenta con su propio servido de desarrollo.

### Instala la dependencia:
`> npm i -D webpack-dev-server`
### Agregamos el comando start a nuestro package.json:
`
"scripts": {
  "start": "webpack serve  --mode development --open --port 3000"
}
`
### Al ejecutarlo, Webpack abrirá la aplicación en una ventana del navegador.
`> npm start`