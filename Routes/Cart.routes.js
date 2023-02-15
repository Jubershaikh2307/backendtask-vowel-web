const express = require('express')
const CartModel = require('../Models/Cart.model');

// 63ebca2e26144c0aba9dbe61 user id

// 63ec6604a9c0a951b0d9181f product id

const cart = express()

cart.get("/:id", async (req, res) => {
    const { id } = req.params
    const data = await CartModel.find({ user_id: id }).populate(['product_id', 'user_id'])

    res.send(data)
})

cart.post("/add", async (req, res) => {

    const { user_id, product_id } = req.body

    let isProduct = await CartModel.findOne({ product_id, user_id })
    if (isProduct) {
        await CartModel.updateOne({ _id: isProduct._id }, { quantity: isProduct.quantity + 1 });
        return res.send({responce:2,des:"cart Update"})
    }else{
        const new_cart = new CartModel({ user_id, product_id })
        await new_cart.save()
        return res.send({responce:1,des:"cart added"})
    }
})

cart.patch('/update/:id', async (req, res) => {
    const { product_id, user_id } = req.body;
    const id = req.params.id;
    try {
        let isProduct = await CartModel.findOne({ product_id, user_id })
        if (isProduct.quantity > 1) {
            await CartModel.updateOne({ _id: isProduct._id }, { quantity: isProduct.quantity - 1 });
        } else {
            await CartModel.deleteOne({ _id: id })
            return res.send({responce:3,des:"cart Delete"})
        }
        return res.send({responce:2,des:"cart Update"})
    } catch (e) {
        res.status(500).send({ msg: "Something went wrong in the cart delete", e });
    }
});

cart.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await CartModel.findByIdAndDelete({ _id: id })
        res.send({ msg: "Item deleted from the cart successfully" })
    } catch (e) {
        res.status(500).send({ msg: "Something went wrong in the cart delete", e });
    }
});

module.exports = cart