
// Guild: Routers
module.exports = (express, app, router, axios) => {
    router.use('/api/guilds', (req, res, next) => {
        if (!req.isAuthenticated || !req.user) return res.json({ statusCode: 401, statusText: "Unauthorized" });
        next();
    });

    router.get('/api/guilds', (req, res) => {
        res.json(req.user.guilds);
    });

    router.post('/api/guilds/:guildId/:type', app.checkAuth, app.checkGuild, async (req, res, next) => {
        const guild = req.params.guildId;
        const module = req.params.type;
        if (!guild || !req._body) return;

        let dbguild = await app.database.guild.findById(guild);
        if (!dbguild) dbguild = new app.database.guild({ _id: guild });

        if (module === 'welcome') {
            dbguild.welcome.enabled = req.body.enabled === 'on' ? true : false;
            dbguild.welcome.channel.id = req.body.channel.split('|')[0];
            dbguild.welcome.channel.name = req.body.channel.split('|')[1];
            dbguild.welcome.message.content = req.body.message.replace(/(?:\r\n|\r|\n)/g, '\n');
            dbguild.welcome.message.attachment = req.body.image;
        } else if (module === 'language') {
            dbguild.language = req.body.language;
        }

        await dbguild.save().catch(() => { });
        return res.redirect(req.lang.routeTo(`/guilds/${guild}/${module}`));
    });
}
