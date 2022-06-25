
// Models: Dashboard Session
module.exports = (Schema) => {
    return new Schema({
        _id: { type: String },
        language: { type: String },
        welcome: {
            enabled: { type: Boolean, default: false },
            channel: {
                id: { type: String },
                name: { type: String }
            },
            message: {
                content: { type: String },
                attachment: {
                    enabled: { type: Boolean, default: false },
                    image: { type: String },
                    content: { type: String },
                    colors: {
                        content: { type: String },
                        avatar: { type: String },
                        title: { type: String },
                        username: { type: String }
                    }
                }
            }
        }
    }, { timestamps: true });
}