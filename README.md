# BCD-Binary-Clock
Un reloj binario tipo BCD con Arduino y Nodejs

## El código desglosado:

Todo el código de este script esta [explicado en mi blog](https://blog.ulisesgascon.com/reloj-binario-con-nodejs-y-arduino)

## Descripción:

![Animación](https://github.com/UlisesGascon/BCD-Binary-Clock/blob/master/img/demo.gif)


Un reloj binario que nos muestre la hora en una matriz de Leds, además se incluye una pantalla LCD que nos 
muestra la hora y la fecha, para complementar nuestro reloj binario.


**Lectura**

![Binary_clock](https://github.com/UlisesGascon/BCD-Binary-Clock/blob/master/img/Binary_clock.svg.png)

Más info sobre relojes binarios:
- https://www.wikiwand.com/es/Reloj_binario


## Configuracion y opciones avanzadas:

El script esta listo para ejecutarse, pero existen opciones addicionales:

- Se incluye una función para depurar usando la consola de Nodejs, que se puede habilitar o deshabilitar.
	~~~
	var debugMode = false; // o true
	~~~

- El LCD es opcional y se puede habilitar o deshabilitar.
	~~~
	var LCDisEnable = true; // o false
	~~~

- Se puede ajustar la intensidad de los LEDs facilmente.
	~~~
	var matrixBrightness = 2; // 0-100
	~~~

- Se puede ajustar la velocidad de la repetición facilmente, en caso de detectar un desfase o una desincronización entre el LCD y la matriz de Leds.
	~~~
	var intervalMS = 1000; // valor en ms. Recomendado: 1000
	~~~



## Hardware necesario:
![Conexiones](https://github.com/UlisesGascon/BCD-Binary-Clock/blob/master/img/protoboard.png)
*Nota: el LCD tiene que tener instalado I2C. En la imagen, no lo es, pero los cables estan conectados como si fuera I2C*

**Placa Arduino UNO o similar**


**Led Matrix 8x16 I2C**
![Prodcut 2054](http://www.adafruit.com/images/1200x900/2054-00.jpg)

- Más información sobre [este producto en Adafruit](http://www.adafruit.com/products/2054)
- Para adaptar este script a otro dispositivo, consulta [Johnny-five API](http://johnny-five.io/api/led/)


**LCD 20x4 con I2C**

*Pantalla LCD*
![Product 198](http://www.adafruit.com/images/970x728/x198-04.jpg.pagespeed.ic.diHsBxj06P.webp)

*I2C Backpack*
![Product i2c](https://learn.adafruit.com/system/assets/assets/000/001/874/medium260/lcds___displays_i2cwire_t.jpeg?1396777095)


- Más información sobre [Pantalla LCD en Adafruit](http://www.adafruit.com/products/198)
- Más información sobre [I2C Backpack en Adafruit](https://learn.adafruit.com/i2c-spi-lcd-backpack)
- Para adaptar este script a otro dispositivo, consulta [Johnny-five API](http://johnny-five.io/api/lcd/)



## Opción addicional:

Para mejorar la usabilidad es recomendable tapar los leds que no se usaran e incluir una ayuda a la lectura. 
 
![Interface](https://github.com/UlisesGascon/BCD-Binary-Clock/blob/master/img/interface.jpg)
*Nota: Esta versión que vemos en la foto esta hecha con un post-it y es solo un prototipo.*



## Dispositivo completo:
![final](https://github.com/UlisesGascon/BCD-Binary-Clock/blob/master/img/final.jpg)



## Instalación:

Es necesario contar con [Nodejs](https://nodejs.org/) y [Npm](https://docs.npmjs.com/getting-started/installing-node) en tu sistema.

Para este script es necesario instalar Johnny-Five:

~~~
sudo npm install -g johnny-five
~~~


## Ejecutar el Script:

Desde la carpeta donde esta *BCDClock.js*

~~~
node BCDClock
~~~
