'use strict';

(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var card = document.querySelector('#card');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');

  var CARD_ALL = 26;
  // var CARD_BASKET = 1;

  var name = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

  var picture = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];

  // создает массив неповторяющихся картинок
  var pictures = getRandomArr(picture, CARD_ALL);

  var contents = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

  // функция создает массив случайных значений из другого массива со случайной длинной
  function getRandomArr(sitems, itemCount) {
    // делаем копию массива элементов состава
    var arrCopy = sitems.slice(0, sitems.length);
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
        picture: pictures[i],
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
        orderedAmount: 1,
      });
    }
    return charArr;
  }

  var candyCards = getCandy(CARD_ALL);

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
  function appendFragment(arrOfCandies, appendTo, renderFunc) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrOfCandies.length; i++) {
      fragment.appendChild(renderFunc(arrOfCandies[i]));
    }
    appendTo.appendChild(fragment);
  }

  appendFragment(candyCards, catalogCards, renderCard);

  // --------------template--goods_card---------------------------------------

  var goodCards = document.querySelector('.goods__cards');
  var goodOrder = document.querySelector('#card-order');

  // убирает сообщение о пустой корзине
  var emptyBasketMessage = function () {
    var goodsArticle = document.querySelector('.goods_card');
    var goodCardsEmpty = document.querySelector('.goods__card-empty');
    goodCards.classList.toggle('goods__cards--empty', goodsArticle === null);
    goodCardsEmpty.classList.toggle('visually-hidden', goodsArticle !== null);
  };

  // Добавление выбранного товара в избранное
  var addButtons = document.querySelectorAll('.card__btn-favorite');

  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.target.classList.toggle('card__btn-favorite--selected');
    });
  }

  // Увеличивает значение
  var increaseValue = function (value) {
    value.value++;
  };

  // добавление id
  var cardsOnCatalog = document.querySelectorAll('.catalog__card');
  var addDataId = function () {
    for (var a = 0; a < cardsOnCatalog.length; a++) {
      cardsOnCatalog[a].setAttribute('data-id', a + 1);
    }
  };
  addDataId();

  // добавление выбранного товара в корзину и проверка на наличие в корзине
  var addCards = document.querySelectorAll('.card__btn');

  function addCardToBasket(goodIndex, target) {
    addCards[goodIndex].addEventListener('click', function (evt) {
      evt.preventDefault();
      var dataAttribute = goodCards.querySelector('[data-id="' + target.dataset.id + '"]');
      if (dataAttribute === null) {
        var goodCard = candyCards[goodIndex];
        var cardElement = goodOrder.content.cloneNode(true);
        cardElement.querySelector('.card-order__title').textContent = goodCard.name;
        cardElement.querySelector('.card-order__img').src = goodCard.picture;
        cardElement.querySelector('.card-order__price').textContent = goodCard.price + ' ₽';
        cardElement.querySelector('.goods_card').setAttribute('data-id', goodIndex + 1);
        goodCards.appendChild(cardElement);
        emptyBasketMessage();
      } else {
        var value = dataAttribute.querySelector('.card-order__count');
        increaseValue(value);
      }

      // удаление товара из корзины
      var closeCards = document.querySelectorAll('.card-order__close');

      function removeCardFromBasket(goodInd) {
        closeCards[goodInd].addEventListener('click', function (e) {
          e.preventDefault();
          closeCards[goodInd].parentNode.remove();
          emptyBasketMessage();
        });
      }
      for (var k = 0; k < closeCards.length; k++) {
        removeCardFromBasket(k);
      }
    });
  }
  for (var j = 0; j < addCards.length; j++) {
    addCardToBasket(j, cardsOnCatalog[j]);
  }

  // Переключение вкладок в форме оплаты

  var payment = document.querySelector('.payment');
  var paymentCardButton = payment.querySelector('#payment__card');
  var paymentCashButton = payment.querySelector('#payment__cash');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var paymentCash = payment.querySelector('.payment__cash-wrap');

  var paymentSwitch = function () {
    paymentCash.classList.toggle('visually-hidden', paymentCardButton.checked === true);
    paymentCard.classList.toggle('visually-hidden', paymentCashButton.checked === true);
  };

  paymentCardButton.addEventListener('click', function () {
    paymentSwitch();
  });

  paymentCashButton.addEventListener('click', function () {
    paymentSwitch();
  });

  // Переключение вкладок в блоке доставки
  var delivery = document.querySelector('.deliver');
  var storeButton = delivery.querySelector('#deliver__store');
  var courierButton = delivery.querySelector('#deliver__courier');
  var store = delivery.querySelector('.deliver__store');
  var courier = delivery.querySelector('.deliver__courier');

  var deliverySwitch = function () {
    courier.classList.toggle('visually-hidden', storeButton.checked === true);
    store.classList.toggle('visually-hidden', courierButton.checked === true);
  };

  storeButton.addEventListener('click', function () {
    deliverySwitch();
  });

  courierButton.addEventListener('click', function () {
    deliverySwitch();
  });

  // переключение адресов самовывоза
  var deliverStore = document.querySelector('.deliver__store-map-wrap');
  var deliverList = document.querySelector('.deliver__store-list');

  deliverList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.closest('#store-academicheskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/academicheskaya.jpg';
    } else if (target.closest('#store-vasileostrovskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/vasileostrovskaya.jpg';
    } else if (target.closest('#store-rechka')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/rechka.jpg';
    } else if (target.closest('#store-petrogradskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/petrogradskaya.jpg';
    } else if (target.closest('#store-proletarskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/proletarskaya.jpg';
    } else if (target.closest('#store-vostaniya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/vostaniya.jpg';
    } else if (target.closest('#store-prosvesheniya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/prosvesheniya.jpg';
    } else if (target.closest('#store-frunzenskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/frunzenskaya.jpg';
    } else if (target.closest('#store-chernishevskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/chernishevskaya.jpg';
    } else if (target.closest('#store-tehinstitute')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/tehinstitute.jpg';
    }
  });

  // ////////////////////////////
  // validation

  var cardNumberInput = document.querySelector('#payment__card-number');
  var wrapCardNumberInput = document.querySelector('.payment__input-wrap--card-number');

  cardNumberInput.onblur = function () {
    var num = cardNumberInput.value;

    function moon(cardNumber) {

      var arr = [];
      cardNumber = cardNumber.toString();
      for (var e = 0; e < cardNumber.length; e++) {
        if (e % 2 === 0) {
          var m = parseInt(cardNumber[e], 16) * 2;
          if (m > 9) {
            arr.push(m - 9);
          } else {
            arr.push(m);
          }
        } else {
          var n = parseInt(cardNumber[e], 16);
          arr.push(n);
        }
      }
      var summ = arr.reduce(function (a, b) {
        return a + b;
      });
      return Boolean(!(summ % 10));
    }

    if (!isNaN(num) && moon(num)) {
      wrapCardNumberInput.classList.remove('text-input--error');
      wrapCardNumberInput.classList.add('text-input--correct');
    } else {
      wrapCardNumberInput.classList.remove('text-input--correct');
      wrapCardNumberInput.classList.add('text-input--error');
    }

  };

})();
