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
