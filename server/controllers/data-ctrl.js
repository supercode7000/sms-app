const Data = require('../models/data-model')

createData = (req, res) => {
    const { body } = req

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a data',
        })
    }

    const data = new Data(body)

    if (!data) {
        return res.status(400).json({ success: false, error: err })
    }

    data
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: data._id,
                message: 'Data created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Data not created!',
            })
        })
}

updateData = async (req, res) => {
    const { body } = req

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Data.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Data not found!',
            })
        }
        data.city = body.city
        data.start_date = body.start_date
        data.end_date = body.end_date
        data.price = body.price
        data.status = body.status
        data.color = body.color
        data
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: data._id,
                    message: 'Data updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Data not updated!',
                })
            })
    })
}

deleteData = async (req, res) => {
    await Data.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }

        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getDataById = async (req, res) => {
    await Data.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getDatas = async (req, res) => {
    await Data.find({}, (err, datas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!datas.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: datas })
    }).catch(err => console.log(err))
}

module.exports = {
    createData,
    updateData,
    deleteData,
    getDatas,
    getDataById,
}