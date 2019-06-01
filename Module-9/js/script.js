'use strict';
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/



const btnStart = document.querySelector('.js-start');
const btnReset = document.querySelector('.js-reset');
const timerFace = document.querySelector('.js-time');
const laps = document.querySelector('.js-take-lap');
const lap = document.querySelector('.js-laps');


class Timer {

  constructor () {
    this.startTime = null;
    this.deltaTime = 0;
    this.timerId = null;
    this.isActive = false;
    this.currentTime = null;
  }

  
  lap() {
      const newLi = document.createElement('li');
      newLi.innerHTML = timerFace.textContent;
      lap.appendChild(newLi);
  }
  
  start () {
    
      this.startTime = Date.now() - this.deltaTime;

      this.timerId = setInterval(() => {

        this.currentTime = Date.now();
        
        this.deltaTime = Date.now() - this.startTime;
        
        const time = new Date(this.deltaTime);
        
        let min = time.getMinutes().toString();
        let sec = time.getSeconds().toString();
        let ms = Number.parseInt(time.getMilliseconds() / 100);
        
        if(min.length < 2) {
          min = '0' + min;
        }

        if(sec.length < 2) {
          sec = '0' + sec;
        }

        timerFace.textContent =  `${min}:${sec}.${ms}`;
        
        btnStart.textContent = 'Pause';
      }, 100);
      
      this.isActive = true;
  }

  stop() {

        clearInterval(this.timerId);
        this.timerId = null;
        
        this.isActive = false;
        btnStart.textContent = 'Continue';
  }

  reset() {
    lap.innerHTML = '';
    timerFace.textContent = `00:00.0`;
    this.deltaTime = 0;
    btnStart.textContent = 'Start';
  }
}



const newTimer = new Timer();

btnStart.addEventListener('click', () => {
  if(!newTimer.isActive) {
    newTimer.start();
  }else {
    newTimer.stop();
  }
});

btnReset.addEventListener('click', () => {
  if(!newTimer.isActive) {
    newTimer.reset();
  }
});

laps.addEventListener('click', () => {
  if(newTimer.isActive) {
    newTimer.lap();
  }
});
