window.addEventListener('load', function () {
  var converter = new showdown.Converter();
  for (const elem of document.getElementsByClassName('convert-md')) {
    var md = elem.dataset.md;
    md = md.replace(/\n{2,}/g, m => m.replace(/\n/g, "<br/>"));
    md = md.replace(/<br\/>([^<])/g, "<br\/>\n\n$1");
    var html = converter.makeHtml(md);
    elem.innerHTML = html;
  }
});