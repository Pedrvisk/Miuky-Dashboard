const { resolve } = require('path');
const i18n = require('i18n');
const mwlang = require('express-mw-lang');

// Plugin: Multi-Language
module.exports = (express, app, router, axios) => {
    const languages = process.env.LANGUAGES.split(',');

    // Language: i18n
    i18n.configure({
        defaultLocale: 'en',
        locales: languages,
        directory: resolve('src/Resources/Languages'),
        objectNotation: true,
        api: {
            __: 't',
            __n: 'tn'
        }
    });
    app.use(i18n.init);

    // Language: express-mw-lang
    const language = new mwlang({
        defaultLanguage: 'en',
        availableLanguages: languages,
        onLangDetected: (lang, req, res) => {
            i18n.setLocale(lang);
            i18n.setLocale(req, lang);
            i18n.setLocale(res, lang);

            if (req.getLocale() === 'en') {
                res.locals.backLanguage = 'pt-BR';
            } else if (req.getLocale() === 'pt-BR') {
                res.locals.backLanguage = 'en';
            }
        }
    });

    language.esu(app);
    language.use(router);
}