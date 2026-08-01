let internal = location.host.replace('www', '');
internal = new RegExp('internal', 'i');

window.addEventListener('load', function () {
  var converter = new showdown.Converter();
  for (const elem of document.getElementsByClassName('convert-md')) {
    var md = elem.dataset.md;
    var html = converter.makeHtml(md);
    elem.innerHTML = html;

    // remove embedded videos from list-view previews
    for (const tag of ['iframe', 'video', 'embed', 'object']) {
      for (const el of Array.from(elem.getElementsByTagName(tag))) {
        el.remove();
      }
    }

    // external links open in new tab
    // (the rehype-external-links build step does not reach client-rendered markdown)
    for (const link of elem.getElementsByTagName('a')) {
      const href = link.host;
      if (!internal.test(href)) {
        link.setAttribute('target', '_blank');
      }
    }
  }
});