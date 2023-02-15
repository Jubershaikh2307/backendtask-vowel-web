const express = require('express')
const bcrypt = require('bcrypt');
const UserModel = require('../Models/User.models');

const user = express()

user.get("/:email", async (req, res) => {
    const { email } = req.params
    const user = await UserModel.findOne({ email }).select("-password")
    console.log(user);
    res.send(user)
})

user.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            const verified = bcrypt.compareSync(password, user.password);
            if (verified) {
                return res.send({ responce: 1, role: user.role ,id:user._id})
            } else {
                return res.send({ responce: -1, role: user.role });
            }
        }else{
            return res.send({ responce: 0})
        }

    } catch (error) {
        return res.send({ error: error });
    }

})

user.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body

    let check = await UserModel.find({ email }).exec()

    if (check.length == 0) {
        const passwordHash = bcrypt.hashSync(password, 10);
        const new_user = new UserModel({
            name,
            email,
            password: passwordHash,
            role
        })
        console.log(new_user);
        await new_user.save()
        res.send({ "responce": "1", "desc": "User Successfull Added" })
    } else {
        res.send({ "responce": "-2", "desc": "User Already Exist" })
    }

})

module.exports = user