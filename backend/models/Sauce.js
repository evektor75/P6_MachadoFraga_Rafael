const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true, match : [/^[^@&"()<>_$*€£`+=\/;?#]+$/] },
    manufacturer: { type: String, required: true, match : [/^[^@&"()<>_$*€£`+=\/;?#]+$/]},
    description: { type: String, required: true, match : [/^[^@&"()<>_$*€£`+=\/;?#]+$/] },
    mainPepper: { type: String, required: true, match : [/^[^@&"()<>_$*€£`+=\/;?#]+$/] },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});


module.exports = mongoose.model('Sauce', sauceSchema);
