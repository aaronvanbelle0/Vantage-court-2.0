/* North West Sport Courts - lead attribution capture
 *
 * Records how a visitor arrived and carries it through to the contact form,
 * so a lead in the CRM can be tied back to the campaign that paid for it.
 *
 * First-touch, per session: the first set of attribution params seen wins and
 * is kept in sessionStorage. That matters because someone can land on
 * /resurfacing.html from an ad and only reach the form on the home page two
 * clicks later - without this the query string is long gone by then.
 *
 * Requires the Google Ads final-URL suffix to carry the campaign id:
 *   utm_source=google&utm_medium=cpc&utm_campaign={campaignid}
 *   &utm_content={adgroupid}&utm_term={keyword}
 * ({campaignid} resolves to the numeric id the CRM joins ad spend on.
 *  gclid is appended automatically by auto-tagging.)
 */
(function () {
  var KEY = 'nwsc_attr';
  var PARAMS = ['gclid', 'wbraid', 'gbraid', 'msclkid',
                'utm_source', 'utm_medium', 'utm_campaign',
                'utm_term', 'utm_content'];

  function read() {
    try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); }
    catch (e) { return null; }
  }

  function save(o) {
    try { sessionStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }

  function capture() {
    var stored = read();
    if (stored) return stored;          // first touch already recorded

    var q, found = {}, any = false;
    try { q = new URLSearchParams(window.location.search); } catch (e) { return null; }

    PARAMS.forEach(function (p) {
      var v = q.get(p);
      if (v) { found[p] = v.slice(0, 300); any = true; }
    });

    var ext = document.referrer &&
              document.referrer.indexOf(window.location.host) === -1;

    // record paid/tagged arrivals, and also plain organic/referral first touches
    if (!any && !ext) return null;

    found.landing_page = (window.location.pathname + window.location.search).slice(0, 300);
    found.referrer = (document.referrer || '').slice(0, 300);
    save(found);
    return found;
  }

  // Every form that should carry attribution is marked `data-attribution`.
  // There is more than one now (the hero form and the full contact form, plus
  // the calculator's "email me this estimate" capture), so fill them all —
  // targeting a single #contact-form id would silently drop the others.
  function fill(attr) {
    if (!attr) return;
    var forms = document.querySelectorAll('form[data-attribution]');
    Array.prototype.forEach.call(forms, function (form) {
      Object.keys(attr).forEach(function (k) {
        var el = form.querySelector('input[name="' + k + '"]');
        if (el && !el.value) el.value = attr[k];
      });
    });
  }

  var attr = capture();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { fill(read() || attr); });
  } else {
    fill(read() || attr);
  }
})();
