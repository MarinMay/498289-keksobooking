'use strict';
(function () {
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  function request(metod, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.open(metod, url);
    xhr.send(data);
  }

  function save(onSuccess, onError, data) {
    request('POST', URL_SAVE, onSuccess, onError, data);
  }

  function load(onSuccess, onError) {
    request('GET', URL_LOAD, onSuccess, onError);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    var button = document.createElement('button')
    node.style = 'z-index: 100; margin: 20 auto; text-align: center; background-color: #fff; color: #ff0304; padding: 50px;';
    node.style.position = 'fixed';
    node.style.width = '30vw';
    node.style.height = '30%';
    node.style.left = '50%';
    node.style.top = '17vw';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    node.style.borderRadius = '5px';
    node.style.boxShadow = '0 0 100px #000';
    node.style.transform = 'translate(-50%, -50%)';
    document.body.insertAdjacentElement('afterbegin', node);
    button.textContent = 'OK';
    button.style = 'margin: 50px auto 0; background-color: #098499; color: #fff; padding: 15px; width: 50px;';
    node.appendChild(button);
  }

  window.backend = {
    save: save,
    load: load,
    errorHandler: errorHandler
  };
})();
