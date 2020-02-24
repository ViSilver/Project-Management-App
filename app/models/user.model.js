const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: String,
    phoneNumber: String,
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
});

module.exports = mongoose.model('User', UserSchema);
mongoose.set('useFindAndModify', false);
