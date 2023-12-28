const {model, Schema, Types} = require("mongoose")

module.exports = model("botlist", new Schema(
    {
        guild: String,
        botlisttkanal: String,
        logskanal: String,
        yetkilirol: String,
        botsrol: String
    }
))