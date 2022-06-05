
// Function: imageURL
module.exports = (express, app, router, axios) =>
    function (data, { type = 0, format = 'webp', size = 1024, dynamic = true } = {}) {

        if (![1, 2].includes(type)) type = 0;
        if (![['webp', 'png', 'jpg', 'jpeg', 'gif']].includes(format)) format = 'webp'
        if ((!Array.from({ length: 9 }, (e, i) => 2 ** (i + 4)).includes(parseInt(size)) || isNaN(parseInt(size)))) size = 1024;

        let image = null;

        let typeData = {
            0: { param: 'avatars', type: 'avatar' },
            1: { param: 'banners', type: 'banner' },
            2: { param: 'icons', type: 'icon' }
        }

        if (!data[typeData[type].type]) return image;

        return image = `https://cdn.discordapp.com/${typeData[type].param}/${data.id}/${data[typeData[type].type]}.${dynamic === true && data[typeData[type].type].startsWith('a_') ? 'gif' : format}${parseInt(size) ? `?size=${parseInt(size)}` : ''}`
    }