'use strict';

(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var card = document.querySelector('#card');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');

  var name = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

  var picture = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
  // var amount = Math.round(Math.random() * 20);
  // var weight = Math.floor(30 + Math.random() * (300 + 1 - 30));

  // var nutritionFacts = {
  //   energy: Math.floor(70 + Math.random() * (500 + 1 - 70)),
  //   contents: ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'лимонная кислота', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо']
  // };
  var cardsAmount = 26;

  function getIceAttribute(arr) {
    var randInt = Math.floor(Math.random() * arr.length);
    return arr[randInt];
  }

  function getCandy() {
    var charArr = [];
    for (var i = 0; i < cardsAmount; i++) {
      charArr.push({
        name: getIceAttribute(name),
        picture: getIceAttribute(picture),
        price: Math.floor(100 + Math.random() * (1500 + 1 - 100)),
        ratingValue: Math.floor(1 + Math.random() * (5 + 1 - 1)),
        ratingNumber: Math.floor(10 + Math.random() * (900 + 1 - 10)),
        sugar: Boolean(Math.round(Math.random())),
      });
    }
    return charArr;
  }

  var candyCards = getCandy();

  function renderCard(candyCard) {
    var cardElement = card.content.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = candyCard.name;
    cardElement.querySelector('.card__img').src = candyCard.picture;
    cardElement.querySelector('.card__price').textContent = candyCard.price;
    cardElement.querySelector('.star__count').textContent = '(' + candyCard.ratingNumber + ')';

    if (candyCard.sugar === true) {
      cardElement.querySelector('.card__characteristic').textContent = 'Содержит сахар';
    } else {
      cardElement.querySelector('.card__characteristic').textContent = 'Без сахара';
    }

    if (candyCard.ratingValue === 1) {
      cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--one');
    } else if (candyCard.ratingValue === 2) {
      cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--two');
    } else if (candyCard.ratingValue === 3) {
      cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--three');
    } else if (candyCard.ratingValue === 4) {
      cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--four');
    }

    return cardElement;
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < candyCards.length; i++) {
    fragment.appendChild(renderCard(candyCards[i]));
  }
  catalogCards.appendChild(fragment);

})();
