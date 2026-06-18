let internal = location.host.replace('www', '');
internal = new RegExp('internal', 'i');

window.addEventListener('load', function () {
  var converter = new showdown.Converter();
  for (const elem of document.getElementsByClassName('convert-md')) {
    var md = elem.dataset.md;
    var html = converter.makeHtml(md);
    elem.innerHTML = html;

    // external links open in new tab
    // (jekyll-target-blank does not work on yml data)
    for (const link of elem.getElementsByTagName('a')) {
      const href = link.host;
      if (!internal.test(href)) {
        link.setAttribute('target', '_blank');
      }
    }
  }
});