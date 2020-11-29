const users = require("../models").User;
const childrenTable = require("../models").children;
const jwt = require("jsonwebtoken");

module.exports = {
    patch: async (req, res) => {
        let tokenString = req.get("auth");
        if (tokenString && tokenString.length > 7) {
            let token = tokenString.substring(7);
            jwt.verify(token, 'momsitter', async (err, decoded) => {
                if (err) {
                    res.status(404).send({ result: "User does not exist" });
                } else {
                    try {
                        let userData = await users.findOne({
                            where: {
                                id: decoded.userNum
                            }
                        });
                        if (userData.isParentMember === true) {
                            res.status(400).send({ result: "Already a parent member" });
                        } else {
                            for (let i in req.body.children) {
                                await childrenTable.create({
                                    parentId: decoded.userNum,
                                    birthDate: req.body.children[i].birthDate,
                                    gender: req.body.children[i].gender
                                });
                            }
                            await users.update({
                                isParentMember: true,
                                parentDesc: req.body.description
                            }, {
                                where: {
                                    id: decoded.userNum
                                }
                            });
                            res.status(201).send({ result: "Change success" });
                        }
                    } catch (err) {
                        res.status(500).send({ result: "Server error" });
                    }
                }
            });
        } else {
            res.status(400).send({ result: "Invalid request" });
        }
    }
}