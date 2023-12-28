const mongoose = require("mongoose");

module.exports = url => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        autoIndex: false,
    }).then(async () => {
        console.log("👨‍💻 Mongo Başlatıldı!");
    }).catch(async (err) => {
        console.error(err);
    });
};