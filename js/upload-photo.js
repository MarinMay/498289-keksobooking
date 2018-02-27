'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview img');
  var fileChooserPhotoHouse = document.querySelector('#images');
  var photoHousePreview = document.querySelector('.form__photo-container');
  var avatarDropZone = document.querySelector('.notice__header .drop-zone');
  var photoHouseDropZone = photoHousePreview.querySelector('.drop-zone');
  var draggedItem = null;

  // проверка формата файлов
  function mutchesNameFiles(name) {
    return FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
  }

  function onPhotoHouseReaderLoad(image, reader) {
    reader.addEventListener('load', function () {
      image.src = reader.result;
      photoHousePreview.appendChild(image);
    });
  }

  function onAvatarChange() {
    var file = fileChooserAvatar.files[0];
    uploadAvatar(file);
  }

  function uploadAvatar(file) {
    var fileName = file.name.toLowerCase();
    var matches = mutchesNameFiles(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function uploadPhotoHouse(file) {
    var fileName = file.name.toLowerCase();
    var matches = mutchesNameFiles(fileName);

    if (matches) {
      var reader = new FileReader();
      var image = document.createElement('img');

      image.style.width = '120px';
      image.style.height = 'auto';
      image.style.margin = '3px';
      image.draggable = 'true';
      image.addEventListener('dragenter', dragEnter);
      image.addEventListener('dragover', dragOver);
      image.addEventListener('drop', dropStirPhoto);

      onPhotoHouseReaderLoad(image, reader);
      reader.readAsDataURL(file);
    }
  }

  function onPhotoHouseChange() {
    var files = fileChooserPhotoHouse.files;

    [].forEach.call(files, (function (file) {
      uploadPhotoHouse(file);
    }));
  }


  function photoHouseDragStart(evt) {
    if (evt.target.tagName === 'IMG') {
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      draggedItem = evt.target;
    }
  }

  function dragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function dropStirPhoto(evt) {
    evt.stopPropagation();
    var elem = evt.target;
    photoHousePreview.insertBefore(draggedItem, elem);
  }

  function dropAvatar(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    uploadAvatar(files[0]);
  }

  function dropPhotoHouse(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    uploadPhotoHouse(files[0]);
  }

  avatarDropZone.addEventListener('dragenter', dragEnter);
  avatarDropZone.addEventListener('dragover', dragOver);
  avatarDropZone.addEventListener('drop', dropAvatar);

  photoHouseDropZone.addEventListener('dragenter', dragEnter);
  photoHouseDropZone.addEventListener('dragover', dragOver);
  photoHouseDropZone.addEventListener('drop', dropPhotoHouse);

  photoHousePreview.addEventListener('dragstart', photoHouseDragStart);
  fileChooserAvatar.addEventListener('change', onAvatarChange);
  fileChooserPhotoHouse.addEventListener('change', onPhotoHouseChange);
})();
