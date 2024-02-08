const { mongoConn }  = require("../../props");
const express = require('express');
const loginRouter = express.Router();

const bcrypt = require('bcrypt');

loginRouter.get("/", async (req, res) => {
    console.log("loginRouter");
    res.json("loginRouter");
});

loginRouter.get("/getAll", async (req, res) => {
    const client = await mongoConn(req);
    const index = "tb_users";
    const mongo = client.collection(index);

    try {
        const body = await mongo.find().toArray();
        res.json(body);
    }
    catch (error) {
        console.error(error);
    }
});

loginRouter.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const client = await mongoConn(req);
    const index = "tb_users";
    const mongo = client.collection(index);
    const body = await mongo.insertOne({
        username,
        password: hashedPassword
    });
    try {
        res.json(body);
    } 
    catch (error) {
        console.error(error);
    }
    
});

loginRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const client = await mongoConn(req);
    const index = "tb_users";
    const mongo = client.collection(index);

    try {
        const body = await mongo.findOne({ username });

        if (body && bcrypt.compareSync(password, body.password)) {
            res.send(true);
        } else {
            res.send(false);   
        }
    }
    catch (error) {
        console.error(error);
    }
});

module.exports = loginRouter;