const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = Schema({
    name: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Group', GroupSchema);
mongoose.set('useFindAndModify', false);
