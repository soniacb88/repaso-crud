const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterSchema = new Schema({
    name: String,
    description: String,
    inversions: Number,
    length: Number,
    active: Boolean,
    park: Schema.Types.ObjectId

})

module.exports = mongoose.model('Coaster', coasterSchema)