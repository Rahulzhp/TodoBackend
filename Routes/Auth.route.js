
const express = require("express");
const { AuthModel } = require("../models/AuthModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
require("dotenv").config()


const AuthRoute = express.Router()
AuthRoute.use(express.json())

AuthRoute.post("/register", async (req, res) => {
    let { Username, Email, Pass, DOB } = req.body;
    try {
        let email = await AuthModel.find({ Email })
        if (email.length > 0) {
            res.send("Email already registered")
        } else {
            bcrypt.hash(Pass, 5, async (err, hased_pass) => {
                if (err) {
                    console.log("er")
                } else {
                    let user = new AuthModel({ Username, Email, Pass: hased_pass, DOB })
                    await user.save()
                    res.send({ "msg": "Registered Successfully" })
                }
            })
        }
    }
    catch (er) {
        res.send({ "er": "something went wrong" })
    }
})

AuthRoute.post("/login", async (req, res) => {
    let { Email, Pass } = req.body;
    try {
        let user = await AuthModel.find({Email,Pass})
        //console.log(user.Pass)
        if (user) {
            bcrypt.compare(Pass, user[0].Pass, function (er, result) {
                if (result) {
                    let token = jwt.sign({ course: user[0]._id }, "rhl")
                    res.send({ "msg": "Login Successfully", "token": token })
                } else {
                    res.send({ "er": "wrong credential" })
                }
            })
        }
        else {
            res.send({ "er": "wrong credential" })
        }

    }
    catch (er) {
        res.send({ "er": "something went wrong" })
    }
})

module.exports = {
    AuthRoute
}