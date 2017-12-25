'use strict';
(function () {
  var COLOR_ACTIVE_BACKGROUND = 'rgba(114, 214, 19, 0.5)';

  var dropFiles = function (dropZone, input) {
    document.addEventListener('dragover', function (event) {
      event.preventDefault();
      event.stopPropagation();
    }, false);

    dropZone.addEventListener('drop', function (event) {
      event.preventDefault();
      event.stopPropagation();
      dropZone.style.backgroundColor = '';
      input.files = event.dataTransfer.files;
    }, false);

    dropZone.addEventListener('dragenter', function (event) {
      event.preventDefault();
      event.stopPropagation();
      dropZone.style.backgroundColor = COLOR_ACTIVE_BACKGROUND;
    });

    dropZone.addEventListener('dragleave', function (event) {
      event.preventDefault();
      event.stopPropagation();
      dropZone.style.backgroundColor = '';
    });
  };

  window.dropFiles = dropFiles;
})();
