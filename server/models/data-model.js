const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema(
    {
        id: { type: Number, required: true },
        city: { type: String, required: true },
        start_date: { type: String, required: true },
        end_date: { type: String, required: true },
        price: { type: String, required: true },
        status: { type: String, required: true },
        color: { type: String, required: true },

    },
    { timestamps: true },
)

module.exports = mongoose.model('datas', Data)