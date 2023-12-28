const {model, Schema, Types} = require("mongoose")

module.exports = model("sayaç-logs", new Schema(
    {
        guild: String,
        channel: String,
        embedyazi: String,
        hosgeldinyazi: String,
        gorusuruzyazi: String,
        kullanım: String,
    }
))