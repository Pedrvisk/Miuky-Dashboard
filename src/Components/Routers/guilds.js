
// Routers: Guilds
module.exports = (express, app, router, axios) => {
    router.route('/guilds').get(app.checkAuth, async (req, res) => {

        const user = await app.database.dashboard.findOne({ userId: req.user.userId });
        if (user) {
            try {

                const response = await axios.get(`https://discord.com/api/users/@me/guilds`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                });

                const guilds = global.functions.formatGuilds(response.data);
                user.guilds = guilds;
                await user.save();
            } catch {
                // Pov :3
            }
        }

        return app.template('dashboard/guilds')(req, res);
    });

    router.route('/guilds/:guildId').get(app.checkAuth, app.checkGuild, async (req, res) => {
        console.log(req.data)
        return app.template('dashboard/guild', { guild: req.data, pageTitle: req.data.name })(req, res);
    });

    // Guilds: Welcome
    router.route('/guilds/:guildId/welcome').get(app.checkAuth, app.checkGuild, async (req, res) => {
        const channels = await app.client.request({
            type: 'channel',
            data: { guildId: req.data.id }
        }).catch(() => { return null });

        req.data.channels = channels ? channels : req.data.channels;
        return app.template('dashboard/welcome', { guild: req.data, pageTitle: req.data.name, postUrl: 'welcome' })(req, res);
    });

    router.route('/guilds/:guildId/welcome').post(app.checkAuth, app.checkGuild, async (req, res, next) => {
        console.log(req.body);
        return res.redirect(req.lang.routeTo(`/guilds/${req.params.guildId}/welcome`));
    });
}
