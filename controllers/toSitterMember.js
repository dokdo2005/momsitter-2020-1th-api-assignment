const users = require("../models").User;
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
                        if (userData.isSitterMember === true) {
                            res.status(409).send({ result: "Already a sitter member" });
                        } else {
                            await users.update({
                                isSitterMember: true,
                                careAgeStart: req.body.careAgeStart,
                                careAgeEnd: req.body.careAgeEnd,
                                sitterDesc: req.body.description
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