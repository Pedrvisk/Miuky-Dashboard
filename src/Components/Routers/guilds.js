
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

        return app.template('dashboard/guilds', { guilds: user?.guilds || req.user.guilds })(req, res);
    });

    router.route('/guilds/:guildId').get(app.checkAuth, app.checkGuild, async (req, res) => {
        return app.template('dashboard/guild', {
            guild: req.data,
            pageTitle: req.data.name,
            sidenavNumber: 0
        })(req, res);
    });

    // Guilds: Welcome
    router.route('/guilds/:guildId/welcome').get(app.checkAuth, app.checkGuild, async (req, res) => {
        const channels = await app.client.request({
            type: 'channel',
            method: 'GUILD_ALL',
            data: { guildId: req.data.id, type: 'GUILD_TEXT' }
        }).catch(() => { return null });

        const database = await app.database.guild.findById(req.data.id);
        req.data.channels = channels.data ? channels.data : req.user.channels;
        return app.template('dashboard/welcome', {
            guild: req.data,
            database,
            pageTitle: req.data.name,
            postUrl: 'welcome',
            sidenavNumber: 1
        })(req, res);
    });

    // Guilds: Language
    router.route('/guilds/:guildId/language').get(app.checkAuth, app.checkGuild, async (req, res) => {
        const database = await app.database.guild.findById(req.data.id);

        const FullLanguages = {
            'en': "English",
            "pt-BR": "Português-Brasil"
        }
        
        return app.template('dashboard/language', {
            guild: req.data,
            defaultLanguage: { code: database?.language || 'en', language: FullLanguages[database?.language || 'en'] },
            pageTitle: req.data.name,
            postUrl: 'language',
            sidenavNumber: 2
        })(req, res);
    });
}
