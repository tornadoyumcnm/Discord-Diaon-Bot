const {model, Schema, Types} = require("mongoose")

module.exports = model("ozeloda", new Schema(
    {
        guild: String,
        mesaj: String,
        kanal: String,
        kategori: String,
        channels: {type:Array, default: []},
    }
));