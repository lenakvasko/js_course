'use strict'

/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    alt: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    alt: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arh",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    alt: 'link-3.com'
  }
];

function createPostCard({img, title, text, alt}) {

  const movie_inner = document.createElement('div');
  movie_inner.classList.add('.movie_inner');

  const main_img = document.createElement('img');
  main_img.classList.add('movie_img');
  main_img.setAttribute('src', img);
  main_img.setAttribute('alt', alt);

  const main_body = document.createElement('div');
  main_body.classList.add('movie_body');

  movie_inner.prepend(main_img, main_body);

  const main_title = document.createElement('h2');
  main_title.classList.add('main_title');
  main_title.textContent = title;

  const main_description = document.createElement('p');
  main_description.classList.add('movie_description');
  main_description.textContent = text;

  main_body.append(main_title, main_description);

  return movie_inner;
}

function createCards(posts, callback) {

  const newPosts = [];
  
  posts.forEach(el => {
    const part = callback(el);
    newPosts.push(part);
  });
  
  return newPosts;
}

const post = document.querySelector('.movie');

post.append(...createCards(posts, createPostCard));
