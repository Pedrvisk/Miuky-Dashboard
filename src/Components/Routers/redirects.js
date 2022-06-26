
// Routers: Redirect's Only
module.exports = (express, app, router, axios) => {

    router.route('/invite').get((req, res) => {
        return res.redirect(`https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&permissions=1945627743&client_id=692069740989907075${req.user ? '&response_type=code&redirect_uri=https%3A%2F%2Fmiuky.xyz%2Fdiscord%2Fcallback' : ''}`);
    });

    router.route('/invite/:guildId').get(app.checkAuth, (req, res, next) => {
        return res.redirect(`https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&permissions=1945627743&client_id=692069740989907075&response_type=code&redirect_uri=http%3A%2F%2Fmiuky.xyz%2Fdiscord%2Fcallback&guild_id=${req.params.guildId}&disable_guild_select=true`);
    });

    router.route('/support').get((req, res) => {
        return res.redirect(process.env.SUPPORT);
    });

    router.route('/error').get((req, res) => {
        return app.template('error', {
            statusCode: req.query.statusCode || 404,
            message: req.t(`error.message`)[req.query.message] ? req.t(`error.message.${req.query.message || 'notFound'}`) : req.t('error.message.notFound')
        })(req, res);
    });

    // Dashboard: Handler Error
    router.use((req, res) => {
        return res.status(404).redirect(req.lang.routeTo('/error'))
    });
}