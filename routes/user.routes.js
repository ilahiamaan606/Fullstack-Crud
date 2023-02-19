const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userrouter = express.Router();



userrouter.get("/", async (req, res) => {
    let abc = await UserModel.find();
    res.send(abc)
})



userrouter.post("/register", async (req, res) => {
    let { name, email, pass } = req.body;
    let abc = await UserModel.find({ email: email });

    if (abc.length == 1) {
        res.send({"msg":"You are already registered"})
    }
    else {
        bcrypt.hash(pass, 5, async function (err, hash) {
            if (err) {
                res.send(err)
            }
            else {
                let newuser = new UserModel({ name: name, email: email, pass: hash });
                await newuser.save();
                res.send({"msg":"You are registered"})
            }
        });
    }
})

userrouter.post("/login", async (req, res) => {
    try {
        let { email, pass } = req.body;

        let abc = await UserModel.find({ email: email });

        if (abc.length == 1) {
            bcrypt.compare(pass, abc[0].pass, function (err, result) {
                if (result) {
                    let token = jwt.sign({userid:abc[0]._id}, 'shhhhh');
                    res.send({"msg":"You are registered","token":`${token}`})
                }
                else if (result == false) {
                    res.send("Wrong Credentials")
                }
                else if (err) {
                    res.send(err)
                }
            });
        }
        else {
            res.send("You are not registered.")
        }
    }
    catch (error) {
        res.send(error)
    }

})

module.exports = { userrouter }