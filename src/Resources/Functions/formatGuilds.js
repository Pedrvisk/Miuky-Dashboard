
// Function: formatGuilds
module.exports = (express, app, router, axios) =>
    function (guilds) {
        if (!guilds) return;

        let guildsData = [];
        guilds.forEach((guild) => {
            let permission = global.functions.Permissions(guild.permissions, { type: 0 });

            if (!permission.has('ADMINISTRATOR')) return;
            guild.icon = global.functions.imageURL(guild, { type: 2 });
            guildsData.push(guild);
        });

        return guildsData;
    }