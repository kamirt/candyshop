'use strict';

(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var card = document.querySelector('#card');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');

  var name = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

  var picture = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];

  // создает массив неповторяющихся картинок
  var pictures = getRandomArr(picture, 26);

  var contents = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

  // функция создает массив случайных значений из другого массива со случайной длинной
  function getRandomArr(sitems, itemCount) {
    // делаем копию массива элементов состава
    var arrCopy = sitems.slice(0, sitems.length - 1);
    // случайное количество элементов состава, которое будет у этого товара
    itemCount = itemCount > 0 ? itemCount : 1;
    var newArr = [];
    for (var i = 0; i < itemCount; i++) {
      // берем случайное число
      var randInt = Math.floor(Math.random() * arrCopy.length);
      // если выпадает такое же число что и было на прошлой итерации, то он его не может добавить в массив newArr т.к. этот элемент уже удален из массива arrCopy
      newArr.push(arrCopy[randInt]);
      // удаляем уже выбранный элемент из скопированного массива
      arrCopy.splice(randInt, 1);
    }
    // джойним и возвращаем строкой готовый случайный состав
    return newArr;
  }

  // отдает случайное число в массиве
  function getCandyAttribute(arr) {
    var randInt = Math.floor(Math.random() * arr.length);
    return arr[randInt];
  }

  // добавляет в массив charArr все элементы
  function getCandy(cardsAmount) {
    var charArr = [];
    for (var i = 0; i < cardsAmount; i++) {
      charArr.push({
        name: getCandyAttribute(name),
        picture: getCandyAttribute(pictures),
        amount: Math.round(Math.random() * 20),
        price: Math.round(100 + (Math.random() * 1500)),
        weight: Math.round(30 + (Math.random() * 300)),
        rating: {
          value: Math.round(1 + (Math.random() * 5)),
          number: Math.round(10 + (Math.random() * 900)),
        },
        nutritionFacts: {
          sugar: Boolean(Math.round(Math.random())),
          energy: Math.round(70 + (Math.random() * 500)),
          contents: getRandomArr(contents, Math.floor(Math.random() * contents.length)),
        },
      });
    }
    return charArr;
  }

  var candyCards = getCandy(26);

  // создает карточку товара
  function renderCard(candyCard) {
    var cardElement = card.content.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = candyCard.name;
    cardElement.querySelector('.card__img').src = candyCard.picture;
    cardElement.querySelector('.star__count').textContent = '(' + candyCard.rating.number + ')';
    cardElement.querySelector('.card__price').firstChild.textContent = candyCard.price + ' ';
    cardElement.querySelector('.card__weight').textContent = '/ ' + candyCard.weight + ' Г';

    if (candyCard.amount >= 1 && candyCard.amount <= 5) {
      cardElement.querySelector('.catalog__card').classList.remove('card--in-stock');
      cardElement.querySelector('.catalog__card').classList.add('card--little');
    } else if (candyCard.amount === 0) {
      cardElement.querySelector('.catalog__card').classList.remove('card--in-stock');
      cardElement.querySelector('.catalog__card').classList.add('card--soon');
    }

    if (candyCard.nutritionFacts.sugar === true) {
      cardElement.querySelector('.card__characteristic').textContent = 'Содержит сахар' + '. ' + candyCard.nutritionFacts.energy + ' ккал';
    } else {
      cardElement.querySelector('.card__characteristic').textContent = 'Без сахара' + '. ' + candyCard.nutritionFacts.energy + ' ккал';
    }

    cardElement.querySelector('.card__composition-list').textContent = candyCard.nutritionFacts.contents.join(', ');

    var ratings = ['one', 'two', 'three', 'four', 'five'];
    var rating = 'stars__rating--' + ratings[candyCard.rating.value - 1];

    if (candyCard.rating.value) {
      cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      cardElement.querySelector('.stars__rating').classList.add(rating);
      cardElement.querySelector('.stars__rating').textContent = 'Рейтинг: ' + candyCard.rating.value + ' звёзд';
    }

    return cardElement;
  }

  // добавляет карточку товара в DocumentFragment и добавляет на сайт
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < candyCards.length; i++) {
    fragment.appendChild(renderCard(candyCards[i]));
  }
  catalogCards.appendChild(fragment);

  // --------------template--goods_card---------------------------------------


  var goodCards = document.querySelector('.goods__cards');
  var goodCardsEmpty = document.querySelector('.goods__card-empty');
  goodCards.classList.remove('goods__cards--empty');
  goodCardsEmpty.classList.add('visually-hidden');
  var goodOrder = document.querySelector('#card-order');

  var goodsCard = getCandy(3);

  function renderGoodCard(goodCard) {
    var cardElement = goodOrder.content.cloneNode(true);

    cardElement.querySelector('.card-order__title').textContent = goodCard.name;
    cardElement.querySelector('.card-order__img').src = goodCard.picture;
    cardElement.querySelector('.card-order__price').textContent = goodCard.price + ' ₽';

    return cardElement;
  }

  var goodsFragment = document.createDocumentFragment();
  for (var e = 0; e < goodsCard.length; e++) {
    goodsFragment.appendChild(renderGoodCard(goodsCard[e]));
  }
  goodCards.appendChild(goodsFragment);

})();
