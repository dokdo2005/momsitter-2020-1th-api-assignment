const users = require("../models").User;
const childrenTable = require("../models").children;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
    put: async (req, res) => {
        let tokenString = req.get("auth");
        if (tokenString && tokenString.length > 7) {
            let token = tokenString.substring(7);
            jwt.verify(token, 'momsitter', async (err, decoded) => {
                if (err) {
                    res.status(404).send({ result: "User does not exist" });
                } else {
                    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,}$/;    // 7자 이상, 영문 대소문자 및 숫자, 특수기호 포함
                    if (req.body.password.match(regex)) {
                        let encryptedPassword = crypto
                          .createHash("sha256")
                          .update(req.body.password + "momsitter")
                          .digest("hex");
                        try {
                            await users.update({
                                userName: req.body.userName,
                                birthDate: req.body.birthDate,
                                gender: req.body.gender,
                                userId: req.body.userId,
                                password: encryptedPassword,
                                email: req.body.email,
                                careAgeStart: req.body.careAgeStart,
                                careAgeEnd: req.body.careAgeEnd,
                                parentDesc: req.body.parentDesc,
                                sitterDesc: req.body.sitterDesc
                            }, {
                                where: {
                                    id: decoded.userNum
                                }
                            });
                            let userInfo = await users.findOne({
                                where: {
                                    id: decoded.userNum
                                }
                            });
                            if (userInfo.isParentMember === true) {
                                for (let i in req.body.children) {
                                    await childrenTable.update({
                                        birthDate: req.body.children[i].birthDate,
                                        gender: req.body.children[i].gender
                                    }, {
                                        where: {
                                            id: req.body.children[i].id
                                        }
                                    });
                                }
                            }
                            res.status(201).send({ result: "Update success" });
                        } catch (err) {
                            res.status(500).send({ result: "Server error" });
                        }
                    } else {
                        res.status(400).send({ result: "Invalid password" });
                    }
                }
            });
        } else {
            res.status(400).send({ result: "Invalid request" });
        }
    }
}