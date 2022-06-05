
// Models: Dashboard Session
module.exports = (Schema) => {
    return new Schema({
        _id: { type: String },
        language: { type: String },
        welcome: {
            enabled: { type: Boolean },
            channel: {
                id: { type: String },
                name: { type: String }
            },
            message: {
                content: { type: String },
                attachment: { type: String }
            }
        }
    }, { timestamps: true });
}