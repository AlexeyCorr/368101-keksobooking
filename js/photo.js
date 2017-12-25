'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fieldsFile = document.querySelectorAll('input[type="file"]');
  var fieldPreviewAvatar = document.querySelector('.notice__preview img');
  var fieldPreviewPhoto = document.querySelector('.form__photo-container');
  var fieldsdropZone = document.querySelectorAll('.drop-zone');

  var imageAdding = {
    avatar: function (source) {
      fieldPreviewAvatar.src = source;
    },
    images: function (source) {
      var image = document.createElement('img');
      image.src = source;
      image.draggable = true;
      image.style.maxWidth = '100%';
      image.style.height = 'auto';
      image.style.marginTop = '10px';
      fieldPreviewPhoto.appendChild(image);
    }
  };

  var onInputChange = function (event) {
    var file = event.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageAdding[event.target.id](reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  Array.from(fieldsFile).forEach(function (input, i) {
    input.accept = 'image/jpeg, image/jpg, image/png, image/gif';
    window.dropFiles(fieldsdropZone[i], input);
    input.addEventListener('change', onInputChange);
  });

})();
