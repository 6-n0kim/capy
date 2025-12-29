(function () {
  function includeInto(elementId, url) {
    var el = document.getElementById(elementId);
    if (!el) return;

    try {
      // sync XHR: main.js 초기화 전에 header/footer가 DOM에 있어야 하는 구조라서 사용
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);

      if (xhr.status >= 200 && xhr.status < 300) {
        el.innerHTML = xhr.responseText;
      } else {
        console.warn('[includes] failed:', url, xhr.status);
      }
    } catch (e) {
      console.warn('[includes] error:', url, e);
    }
  }

  var isIndex = document.body && document.body.classList.contains('index-page');
  var headerUrl = isIndex ? 'partials/header.html' : 'partials/header.html';
  var footerUrl = isIndex ? 'partials/footer-index.html' : 'partials/footer-portfolio.html';

  // 페이지별 바디 클래스(오버라이드용)
  var page = (document.title || '').toLowerCase();
  if (page.includes('docgen')) document.body.classList.add('portfolio-docgen');

  includeInto('site-header', headerUrl);
  includeInto('site-footer', footerUrl);
})();
