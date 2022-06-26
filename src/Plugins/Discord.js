const DiscordStrategy = require('passport-discord').Strategy;
const refresh = require('passport-oauth2-refresh');

const session = require('express-session');
const passport = require('passport');
const MongoDB = require('connect-mongo');

// Plugin: Discord
module.exports = (express, app, router, axios) => {

    // OAuth2: Serialize/Deserialize
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await app.database.dashboard.findById(id);
        if (user) done(null, user);
    });

    let passportAuth = process.env.DISCORDAUTH.split('|');
    // OAuth2: Passport Settings
    const DiscordAuth = new DiscordStrategy({
        clientID: passportAuth[0],
        clientSecret: passportAuth[1],
        callbackURL: passportAuth[2],
        scope: ['identify', 'guilds']
    }, async function (accessToken, refreshToken, profile, done) {

        try {
            const guilds = global.functions.formatGuilds(profile.guilds);
            const user = await app.database.dashboard.findOne({ userId: profile.id });
            if (user) {
                await user.updateOne({
                    username: profile.username,
                    tag: `${profile.username}#${profile.discriminator}`,
                    avatar: global.functions.imageURL(profile, { type: 0 }),
                    banner: global.functions.imageURL(profile, { type: 1 }),
                    guilds,
                    accessToken,
                    refreshToken
                });

                return done(null, user);
            } else {
                const newUser = await app.database.dashboard.create({
                    userId: profile.id,
                    username: profile.username,
                    tag: `${profile.username}#${profile.discriminator}`,
                    avatar: global.functions.imageURL(profile, { type: 0 }),
                    banner: global.functions.imageURL(profile, { type: 1 }),
                    guilds,
                    accessToken,
                    refreshToken
                });

                const saveUser = await newUser.save();
                return done(null, saveUser);
            }
        } catch (err) {
            return done(err, null);
        }
    });

    passport.use(DiscordAuth);
    refresh.use(DiscordAuth);

    // Discord: Session
    app.use(session({
        secret: 'K2W9K923k902K902ksa9213k',
        cookie: {
            maxAge: 60000 * 60 * 24 * 7
        },
        saveUninitialized: false,
        resave: false,
        name: 'MiukyOAuth2',
        store: MongoDB.create({
            mongoUrl: process.env.MONGO_URL
        })
    }));

    app.use(passport.session());
    app.use(passport.initialize());

    // Discord: Authentication
    app.checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        return res.redirect('/discord/login');
    }

    // Discord: Check Guild 
    app.checkGuild = async (req, res, next) => {
        const guild = req.params.guildId;
        if (!guild || isNaN(guild)) return res.redirect(req.lang.routeTo('/guilds'));

        const user = await app.database.dashboard.findOne({ userId: req.user.userId });
        if (!user) return res.redirect(req.lang.routeTo('/discord/login'));

        const dbguild = global.functions.checkGuildDB(guild, user.guilds);
        if (!dbguild) return res.redirect(req.lang.routeTo('/guilds'));

        const guildAPI = await app.client.request({
            type: 'guild',
            method: 'GET',
            data: { id: dbguild.id }
        }).catch(() => { return null });

        if (!guildAPI || guildAPI.statusCode === 404) return res.redirect(req.lang.routeTo(`/invite/${guild}`));
        req.data = guildAPI.data;
        next();
    }

    // Discord: Redirect Url
    app.use((req, res, next) => {
        if (!req._parsedUrl.href.match('/discord/')) res.locals.backUrl = req._parsedUrl.href;
        next();
    })

    // Discord: Login
    router.route('/discord/login').get(passport.authenticate('discord', { permissions: 1945627743 }));

    // Discord: Callback
    router.route('/discord/callback').get((req, res, next) => {
        // Haha not work ;(
        const language = res.locals.backLanguage === res.locals.locale ? `/${res.locals.backLanguage}` : '';

        return passport.authenticate('discord', {
            failWithError: true,
            failureRedirect: `${language}/error?statusCode=401&message=${req.user ? 'invite' : 'oauth'}`,
            successRedirect: `${language}/guilds${req.query.guild_id ? `/${req.query.guild_id}` : ''}`
        })(req, res, next);
    });

    // Discord: Logout
    router.route('/discord/logout').get(app.checkAuth, async (req, res) => {
        const user = await app.database.dashboard.findOne({ userId: req.user.userId });
        if (user) await app.database.dashboard.deleteOne({ userId: req.user.userId });

        req.logout();
        return res.redirect(req.lang.routeTo(`${res.locals.backUrl ? res.locals.backUrl : '/'}`));
    });
}