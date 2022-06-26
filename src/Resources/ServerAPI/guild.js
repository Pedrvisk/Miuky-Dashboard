
// Guild: Routers
module.exports = (express, app, router, axios) => {
    router.use('/api/guilds', (req, res, next) => {
        if (!req.isAuthenticated || !req.user) return res.json({ statusCode: 401, statusText: "Unauthorized" });
        next();
    });

    router.get('/api/guilds', (req, res) => {
        res.json(req.user.guilds);
    });

    router.get('/api/guilds/:guildId', async (req, res) => {
        if (req.user?.id !== process.env.DEVELOPER) return;
        res.json(req.data);
    });

    router.post('/api/guilds/:guildId/:type', app.checkAuth, app.checkGuild, async (req, res, next) => {
        const guild = req.params.guildId;
        const module = req.params.type;
        if (!guild || !module || !req._body) return;

        let dbguild = await app.database.guild.findById(guild);
        if (!dbguild) dbguild = new app.database.guild({ _id: guild });
        console.log(req.body)

        switch (module) {
            case 'welcome': {
                dbguild.welcome.enabled = req.body.enabled === 'on' ? true : false;

                if (dbguild.welcome.enabled) {
                    dbguild.welcome.channel.id = req.body.channel.split('|')[0];
                    dbguild.welcome.channel.name = req.body.channel.split('|')[1];
                    dbguild.welcome.message.content = req.body.message.replace(/(?:\r\n|\r|\n)/g, '\n');

                    dbguild.welcome.message.attachment.enabled = req.body.attachment_enabled === 'on' ? true : false;
                    if (dbguild.welcome.message.attachment.enabled) {
                        dbguild.welcome.message.attachment.image = req.body.color_background;
                        dbguild.welcome.message.attachment.colors.avatar = req.body.color_border;
                        dbguild.welcome.message.attachment.colors.username = req.body.color_username;
                        dbguild.welcome.message.attachment.colors.title = req.body.color_title;
                        dbguild.welcome.message.attachment.colors.content = req.body.color_description;
                        dbguild.welcome.message.attachment.content = req.body.content;
                    }
                }
            }
            case 'language': {
                dbguild.language = req.body.language;
            }
        }

        await dbguild.save().catch(() => { });
        return res.redirect(req.lang.routeTo(`/guilds/${guild}/${module}`));
    });
}
