'use strict';
/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/

var list = document.querySelector('.list');
var form = document.querySelector('.js-form');
var input = document.querySelector('.js-input');
var tittle = document.querySelector('.hide');
var source = document.querySelector('.laptops-tpl').innerHTML.trim();
var template = Handlebars.compile(source);
var urls = [];

function allUrls(mas) {
  var markup = mas.reduce(function (acc, el) {
    return acc += template(el);
  }, '');
  list.innerHTML = markup;
} //get all urls in one massive and build an html


function checkValidUrl(url) {
  var pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  var result = pattern.test(url);
  var isWritted = urls.some(function (el) {
    return el.url === url;
  });

  if (result && !isWritted) {
    fetch("https://api.linkpreview.net/?key=5cd71a29bf3526610f7d14eb637f134f14713b1c85043&q=".concat(url)).then(function (resp) {
      if (resp.ok) return resp.json();
      throw new Error('Error' + resp.statusText);
    }).then(function (data) {
      urls.unshift({
        url: data.url,
        img: data.image
      }), allUrls(urls);
      set();
    })["catch"](function (err) {
      return console.log('Error: ' + err);
    });
  } else if (isWritted) {
    return alert("Such an url is existed!");
  } else {
    return alert("It's unvalid url!");
  }
}

function set() {
  localStorage.setItem("fetchTags", JSON.stringify(urls));
} //download from the workspace to localstorage


function get() {
  var data = localStorage.getItem("fetchTags");
  var mas = JSON.parse(data);

  if (mas !== null) {
    return mas;
  }

  ;
} //take elements from the localstorage


function updateLocMas() {
  if (localStorage.getItem('fetchTags')) {
    var mas = JSON.parse(localStorage.getItem('fetchTags'));
    urls = mas;
  }
}

function handleDel(_ref) {
  var target = _ref.target;

  if (target.nodeName === 'BUTTON') {
    console.log(urls);
    urls = urls.filter(function (el) {
      return target.previousElementSibling.innerHTML != el.url;
    });
    allUrls(urls);
    set();
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(input.value);
  checkValidUrl(input.value);
  allUrls(urls);
  set();
});
list.addEventListener('click', handleDel);
updateLocMas();
allUrls(get());
console.log(urls);