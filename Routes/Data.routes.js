const express = require('express')
const bcrypt = require('bcrypt');
const DataModel = require('../Models/Data.model');


const product = express()

product.get("/", async (req, res) => {
    const data = await DataModel.find()
    res.send(data)
})

product.post("/add", async (req, res) => {
    const { title, description, price, category, images } = req.body
    const new_data = new DataModel({ title, description, price, category, images })
    await new_data.save()
    res.send({ "responce": "1", "desc": "Product Successfull Retrive" })
})

product.post("/add", async (req, res) => {
    const { title, description, price, category, images } = req.body
    const new_data = new DataModel({ title, description, price, category, images })
    await new_data.save()
    res.send({ "responce": "1", "desc": "Product Successfull Added" })
})

product.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    await DataModel.deleteOne({ id })
    res.send({ "responce": "1", "desc": "Product Successfull Deleted" })
})

product.patch("/update/:id", async (req, res) => {
    const { title, description, price, category, images } = req.body
    await DataModel.updateOne({ title, description, price, category, images })
    res.send({ "responce": "1", "desc": "Product Successfull Update" })
})

module.exports = product