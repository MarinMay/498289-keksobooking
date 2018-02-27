'use strict';
(function () {
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var REQUEST_TIMEOUT = 10000;
  var STATUS_CODE = {
    ok: 200,
    badRequest: 400,
    notFound: 404
  };

  // выполняет запрос на сервер
  function executeRequest(metod, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT; // 10s

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_CODE.ok:
          onSuccess(xhr.response);
          break;
        case STATUS_CODE.badRequest:
          error = 'Неверный запрос';
          break;
        case STATUS_CODE.notFound:
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

  function saveForm(onSuccess, onError, data) {
    executeRequest('POST', URL_SAVE, onSuccess, onError, data);
  }

  function loadData(onSuccess, onError) {
    executeRequest('GET', URL_LOAD, onSuccess, onError);
  }

  function onRequestError(errorMessage) {
    var node = document.createElement('div');
    var button = document.createElement('button');
    document.body.insertAdjacentElement('afterbegin', node);
    node.style = 'z-index: 100; text-align: center; background-color: #fff; color: #ff0304; padding: 40px;';
    node.style.position = 'fixed';
    node.style.width = '30vw';
    node.style.left = '50%';
    node.style.top = '17vw';
    node.style.fontSize = '30px';
    node.innerHTML = '<p>' + errorMessage + '</p>';
    node.style.borderRadius = '5px';
    node.style.boxShadow = '0 0 100px #000';
    node.style.transform = 'translate(-50%, -50%)';
    button.textContent = 'OK';
    button.style = 'width: 200px; margin: 20px auto 0; padding: 15px;  color: #fff; background-color: #098499; border: none; border-radius: 3px; cursor: pointer;';
    node.appendChild(button);
    button.addEventListener('click', function () {
      document.body.removeChild(node);
    });
  }

  window.backend = {
    saveForm: saveForm,
    loadData: loadData,
    onRequestError: onRequestError
  };
})();
