const localesMap = {
  "en": "i18n/en.json",
  "en-US": "i18n/en.json",
  "fr": "i18n/fr-fr.json",
  "fr-FR": "i18n/fr-fr.json",
  "de": "i18n/de-de.json",
  "de-DE": "i18n/de-de.json",
  "it": "i18n/it-it.json",
  "it-IT": "i18n/it-it.json",
  "es": "i18n/es-es.json",
  "es-ES": "i18n/es-es.json",
  "pt": "i18n/pt-pt.json",
  "pt-PT": "i18n/pt-pt.json",
  "pl": "i18n/pl-pl.json",
  "pl-Pl": "i18n/pl-pl.json",
};

const getConfigForLocales = (locales) => {
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];

    if (!!locale) {
      if (localesMap[locale]) {
        return {
          locale: locale,
          map: {
            [locale]: localesMap[locale]
          }
        };
      }

      const language = locale.split('-')[0];

      if (language && localesMap[language]) {
        return {
          locale: language,
          map: {
            [language]: localesMap[language]
          }
        };
      }
    }
  }

  return null;
};

const determineLocaleConfig = (detectedLocale) => {
  const searchParams = new URLSearchParams((new URL(window.location)).search);
  const localeParam = searchParams.get('locale');

  // first try locale selected in app by user
  // next try locale detected by jQuery.i18n library
  // if all else fails, give them English
  return getConfigForLocales([localeParam, detectedLocale, 'en']);
};

$(function () {
  const init = function () {
    // translate static elements and initialize translations
    // then, remove spinner and show page content
    $('.i18n').i18n();
    window.i18nReady = true;
    $('html').trigger('i18n:ready');
    $('.translated-content').css({ display: 'block' });
    $('.languages-loading').css({ display: 'none' });
  };

  const detectedLocale = $.i18n().locale;
  const localeConfig = determineLocaleConfig(detectedLocale);

  $.i18n({ locale: localeConfig.locale }).load(localeConfig.map).done(init);
});
