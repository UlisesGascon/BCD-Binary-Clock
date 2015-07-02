var five = require("johnny-five");
var board = new five.Board();

// Ajustamos el brillo (0-100)
var matrixBrightness = 2;

// Depurador
var debugMode = false;

// Usar LCD
var LCDisEnable = true;

// IntervalMS
var intervalMS = 1000;


// Si esta activado el modo depuración se imprime esta información en la consola 
if (debugMode) {
  console.log("----------------------");
  console.log("Modo depuración Activado!");
  // Verificación del LCD
  if (LCDisEnable) {
    console.log("El LCD esta activado");
  } else {
    console.log("El LCD esta desactivado");
  };
  // Brillo
  console.log("La intensidad del brillo es "+matrixBrightness);
  // Intervalo
  console.log("El ritmo del intervalo es "+intervalMS+"ms");
  console.log("----------------------");
};



/* 
    Funciones de tiempo
*/

// Función para imprimir en el LCD la fecha en este formato (DD/MM/YYYY)
function getDateLCD () {
    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return ""+day+"/"+month+"/"+year; // DD/MM/YYYY
}

// Función para imprimir en el LCD la hora en este formato (HH:MM:SS)
function getTimeLCD () {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return ""+ hour + ":" + min + ":" + sec; // HH:MM:SS
  };

// Función para devolver la hora en este formato (HHMMSS)
function getSpecialTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return ""+hour+""+min+""+sec; //HHMMSS

}


board.on("ready", function() {

// Definimos la Matriz de Leds (HT16K33 de 8X16) usando I2C 
var matrix = new five.Led.Matrix({
    addresses: [0x70],
    controller: "HT16K33",
    dims: "8x16",
    rotation: 2
});


// Definimos el LCD (LCM1602 de 4X20) usando I2C 
var lcd = new five.LCD({
    controller: "LCM1602",
    pins: ["A5", "A4"],
    rows: 4,
    cols: 20
});



// Limpiamos los dispositivos al arrancar
matrix.clear();
lcd.clear();

// Ajustamos el brillo de la matriz
matrix.brightness(matrixBrightness);

/*
    Variables dentro de la Matriz
*/

/*
  === Formato ===
  xyz = h12, h22, s24, m13 ...

  x es h (horas), m (minutos) o s (segundos)
  y es columna de izquierda a derecha
  z es valor 1, 2, 4 o 8.

  Ejemplo: h11 -> en horas, columna 1, led que equivale al valor 1. 
  Más info -> https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Binary_clock.svg/640px-Binary_clock.svg.png?1435837556051
*/

/*
    Variables de las horas
*/
// columna 1
var h11 = 0;
var h12 = 0;

// columna 2
var h21 = 0;
var h22 = 0;
var h24 = 0;
var h28 = 0;


/*
    Variables de los minutos
*/
// columna 1
var m11 = 0;
var m12 = 0;
var m14 = 0;

// columna 2
var m21 = 0;
var m22 = 0;
var m24 = 0;
var m28 = 0;


/*
    Variables de los segundos
*/
// columna 1
var s11 = 0;
var s12 = 0;
var s14 = 0;

// columna 2
var s21 = 0;
var s22 = 0;
var s24 = 0;
var s28 = 0;



// Función que regula el comportamiento de los leds
function runMatrix () {

    // Crear un array con cada elemento de la función que da la hora en formato (HHMMSS) -> [H,H,M,M,S,S]
    var res = getSpecialTime().split("");
    
    // Depurador
    if (debugMode) {
    console.log("Date: "+getDateLCD()); // Fecha en formato (Date: DD/MM/YYYY)
    console.log("Time: "+getTimeLCD()); // Hora en formato (Time: HH:MM:SS)
    console.log("Valores del array "+res);
    };


    /*
        Definiendo los Leds apagados y encendidos
    */

    /*
        A través de multiples estructuras de control tipo If. se define el estado de los leds.
        por ejemplo: si el valor de la primera columna de la hora es 2, se enciende h12 y se apaga h11.
    */

    // Horas - Primera columna
    if (res[0] == 0) {
      h11 = 0;
      h12 = 0;

    } else if(res[0] == 1){
      h11 = 1;
      h12 = 0;
        
    } else if(res[0] == 2){
      h11 = 0;
      h12 = 1;

    } else {
      h11 = 0;
      h12 = 0;
      console.log("Error in hour column 1")
    };


    // Horas segunda Columna
    if (res[1] == 0) {
      h21 = 0;
      h22 = 0;
      h24 = 0;
      h28 = 0;

    } else if(res[1] == 1){
      h21 = 1;
      h22 = 0;
      h24 = 0;
      h28 = 0;
        
    } else if(res[1] == 2){
      h21 = 0;
      h22 = 1;
      h24 = 0;
      h28 = 0;

    } else if(res[1] == 3){
      h21 = 1;
      h22 = 1;
      h24 = 0;
      h28 = 0;  

    } else if(res[1] == 4){
      h21 = 0;
      h22 = 0;
      h24 = 1;
      h28 = 0;        

    } else if(res[1] == 5){
      h21 = 1;
      h22 = 0;
      h24 = 1;
      h28 = 0;  

    } else if(res[1] == 6){
      h21 = 0;
      h22 = 1;
      h24 = 1;
      h28 = 0;  

    } else if(res[1] == 7){
      h21 = 1;
      h22 = 1;
      h24 = 1;
      h28 = 0;  

    } else if(res[1] == 8){
      h21 = 0;
      h22 = 0;
      h24 = 0;
      h28 = 1;  

    } else if(res[1] == 9){
      h21 = 1;
      h22 = 0;
      h24 = 0;
      h28 = 1;  
                              
    } else {
      h21 = 0;
      h22 = 0;
      h24 = 0;
      h28 = 0;
      console.log("Error in hour column 2")
    };



    // Minutos Primera Columna
    if (res[2] == 0) {
      m11 = 0;
      m12 = 0;
      m14 = 0;

    } else if(res[2] == 1){
      m11 = 1;
      m12 = 0;
      m14 = 0;
        
    } else if(res[2] == 2){
      m11 = 0;
      m12 = 1;
      m14 = 0;

    } else if(res[2] == 3){
      m11 = 1;
      m12 = 1;
      m14 = 0;

    } else if(res[2] == 4){
      m11 = 0;
      m12 = 0;
      m14 = 1;            

    } else if(res[2] == 5){
      m11 = 1;
      m12 = 0;
      m14 = 1;

    } else {
      m11 = 0;
      m12 = 0;
      m14 = 0;
      console.log("Error in minutes column 1")
    };


    // Minutos Segunda Columna
    if (res[3] == 0) {
      m21 = 0;
      m22 = 0;
      m24 = 0;
      m28 = 0;

    } else if(res[3] == 1){
      m21 = 1;
      m22 = 0;
      m24 = 0;
      m28 = 0;
        
    } else if(res[3] == 2){
      m21 = 0;
      m22 = 1;
      m24 = 0;
      m28 = 0;

    } else if(res[3] == 3){
      m21 = 1;
      m22 = 1;
      m24 = 0;
      m28 = 0;  

    } else if(res[3] == 4){
      m21 = 0;
      m22 = 0;
      m24 = 1;
      m28 = 0;        

    } else if(res[3] == 5){
      m21 = 1;
      m22 = 0;
      m24 = 1;
      m28 = 0;  

    } else if(res[3] == 6){
      m21 = 0;
      m22 = 1;
      m24 = 1;
      m28 = 0;  

    } else if(res[3] == 7){
      m21 = 1;
      m22 = 1;
      m24 = 1;
      m28 = 0;  

    } else if(res[3] == 8){
      m21 = 0;
      m22 = 0;
      m24 = 0;
      m28 = 1;  

    } else if(res[3] == 9){
      m21 = 1;
      m22 = 0;
      m24 = 0;
      m28 = 1;  
                              
    } else {
      m21 = 0;
      m22 = 0;
      m24 = 0;
      m28 = 0;
      console.log("Error in minutes column 2")
    };


    // Segundos Primera Columna
    if (res[4] == 0) {
      s11 = 0;
      s12 = 0;
      s14 = 0;

    } else if(res[4] == 1){
      s11 = 1;
      s12 = 0;
      s14 = 0;
        
    } else if(res[4] == 2){
      s11 = 0;
      s12 = 1;
      s14 = 0;

    } else if(res[4] == 3){
      s11 = 1;
      s12 = 1;
      s14 = 0;

    } else if(res[4] == 4){
      s11 = 0;
      s12 = 0;
      s14 = 1;           

    } else if(res[4] == 5){
      s11 = 1;
      s12 = 0;
      s14 = 1;

    } else {
      s11 = 0;
      s12 = 0;
      s14 = 0;
      console.log("Error in seconds column 1")
    };


    // Segundos Segunda Columna
    if (res[5] == 0) {
      s21 = 0;
      s22 = 0;
      s24 = 0;
      s28 = 0;

    } else if(res[5] == 1){
      s21 = 1;
      s22 = 0;
      s24 = 0;
      s28 = 0;
        
    } else if(res[5] == 2){
      s21 = 0;
      s22 = 1;
      s24 = 0;
      s28 = 0;

    } else if(res[5] == 3){
      s21 = 1;
      s22 = 1;
      s24 = 0;
      s28 = 0; 

    } else if(res[5] == 4){
      s21 = 0;
      s22 = 0;
      s24 = 1;
      s28 = 0;      

    } else if(res[5] == 5){
      s21 = 1;
      s22 = 0;
      s24 = 1;
      s28 = 0;

    } else if(res[5] == 6){
      s21 = 0;
      s22 = 1;
      s24 = 1;
      s28 = 0;

    } else if(res[5] == 7){
      s21 = 1;
      s22 = 1;
      s24 = 1;
      s28 = 0;

    } else if(res[5] == 8){
      s21 = 0;
      s22 = 0;
      s24 = 0;
      s28 = 1;  

    } else if(res[5] == 9){
      s21 = 1;
      s22 = 0;
      s24 = 0;
      s28 = 1; 
                              
    } else {
      s21 = 0;
      s22 = 0;
      s24 = 0;
      s28 = 0;
      console.log("Error in seconds column 2")
    };



// Representación visual de la matriz (8x16). Siendo 0 apagado y 1 encendido.
var bcdMatrix = [
    "0000000000000000",
    "0000000000000000",
    "0000"+h28+"000"+m28+"000"+s28+"000",
    "0000"+h24+"00"+m14+""+m24+"00"+s14+""+s24+"000",
    "000"+h12+""+h22+"00"+m12+""+m22+"00"+s12+""+s22+"000",
    "000"+h11+""+h21+"00"+m11+""+m21+"00"+s11+""+s21+"000",
    "0000000000000000",
    "0000000000000000" 
  ];

// Se Pinta el dispositivo con los datos
matrix.draw(bcdMatrix);

}  


/*
    Funcion que regula el LCD
*/

function runLCD () {
      lcd.cursor(0, 0).print("===== BCD CLOCK ====");
      lcd.cursor(1, 0).print("Date: "+getDateLCD()); // (Date: DD/MM/YYYY)
      lcd.cursor(2, 0).print("Time: "+getTimeLCD() ); // (Time: HH:MM:SS)
      lcd.cursor(3, 0).print("===================="); 
};


/*
    Arranque y control de la repetición
*/

// Intervalo que arranca la funcion RunIt, y la repite cada x milisegundos en funcion del valor de "intervalMS".
setInterval(runIt, intervalMS);

// Función que controla la ejecucción de todo lo demás
function runIt () {

  // Arranca el reloj en la Matriz de leds
  runMatrix();

  // Si el LCD esta activo... muestra los datos. Sino... se limpia
  if (LCDisEnable) {
  runLCD();
  }else {
    lcd.clear();
  };

};


}); 