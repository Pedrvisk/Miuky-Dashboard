
// Function: checkCooldown
module.exports = (express, app, router, axios) =>
    function (cacheExpire) {
        const expire = Math.floor(cacheExpire / 1000);
        const now = Math.floor(new Date().getTime() / 1000);

        let data = {
            inCooldown: false,
            timeLeft: Math.abs(expire - now)
        };

        if (expire > now) {
            data = {
                inCooldown: true,
                timeLeft: Math.abs(expire - now)
            }
        }

        return data;
    }