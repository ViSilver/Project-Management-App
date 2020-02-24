const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, enum: ['Personal', 'Group'], required: true},
    members: [{type: Schema.Types.ObjectId, ref: 'User', required: true}]
});

module.exports = mongoose.model('Project', ProjectSchema);
mongoose.set('useFindAndModify', false);
