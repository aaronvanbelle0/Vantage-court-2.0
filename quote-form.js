/* North West Sport Courts - shared quote form handler.
 *
 * Binds every form marked `data-quote-form`: posts to Formspree over fetch,
 * shows an inline result in place, and fires the GA4 lead event plus the
 * Google Ads conversion on success.
 *
 * Deliberately keyed to `data-quote-form` rather than `data-attribution`,
 * because index.html and calculator.html already carry their own inline
 * handlers. Binding on `data-attribution` would double-bind those three forms
 * and submit each lead twice. Those two pages need no edits.
 *
 * Load after attribution.js. Both are `defer`, which preserves order, so the
 * hidden gclid/utm fields are already populated by the time anyone submits.
 */
(function () {
  var PHONE = '(360) 504-8647';
  var EMAIL = 'estimating@nwsportcourts.com';

  function show(status, message, ok) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status text-sm ' +
      (ok ? 'text-[#0EA5E9] font-semibold' : 'text-red-400');
    status.classList.remove('hidden');
  }

  function restore(btn, label) {
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = label;
  }

  function bind(form) {
    var status = form.querySelector('.form-status');
    var btn = form.querySelector('button[type="submit"]');
    var label = btn ? btn.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending\u2026';
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          if (typeof gtag === 'function') {
            gtag('event', 'generate_lead', {
              event_category: 'Contact Form',
              event_label: form.getAttribute('data-quote-form') || location.pathname
            });
            gtag('event', 'conversion', { send_to: 'AW-18189266712' });
          }
          show(status, 'Thanks - we got it. We\u2019ll be in touch within one business day.', true);
          if (btn) btn.classList.add('hidden');
          return;
        }

        return res.json().catch(function () { return {}; }).then(function (data) {
          var msg = data.errors
            ? data.errors.map(function (err) { return err.message; }).join(', ')
            : 'That didn\u2019t send. Call ' + PHONE + ' or email ' + EMAIL + '.';
          show(status, msg, false);
          restore(btn, label);
        });
      }).catch(function () {
        show(status, 'No connection. Try again, or call ' + PHONE + '.', false);
        restore(btn, label);
      });
    });
  }

  function init() {
    Array.prototype.forEach.call(
      document.querySelectorAll('form[data-quote-form]'),
      bind
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
