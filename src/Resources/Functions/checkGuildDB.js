
// Function: checkGuild
module.exports = (express, app, router, axios) =>
    function (guildId, guilds) {
        if (!guilds) return;

        let data = null;
        guilds.forEach((guild) => {
            if (guild.id === guildId) return data = guild;
            else return;
        });

        return data;
    }