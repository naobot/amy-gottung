window.addEventListener('load', function () {
  var converter = new showdown.Converter();
  for (const elem of document.getElementsByClassName('convert-md')) {
    var md = elem.dataset.md;
    var html = converter.makeHtml(md);
    elem.innerHTML = html;
  }
});