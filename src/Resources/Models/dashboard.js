
// Models: Dashboard Session
module.exports = (Schema) => {
    return new Schema({
        userId: { type: String },
        username: { type: String },
        tag: { type: String },
        avatar: { type: String },
        banner: { type: String },
        guilds: { type: Array, default: [] },
        accessToken: { type: String },
        refreshToken: { type: String }
    }, { timestamps: true });
}