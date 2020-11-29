const users = require("../models").User;
const childrenTable = require("../models").children;
const jwt = require("jsonwebtoken");

module.exports = {
    get: async (req, res) => {
        let tokenString = req.get("auth");
        if (tokenString && tokenString.length > 7) {
            let token = tokenString.substring(7);
            jwt.verify(token, 'momsitter', async (err, decoded) => {
                if (err) {
                    res.status(404).send({ result: "User does not exist" });
                } else {
                    try {
                        let childrenInfo = null;
                        let userInfo = await users.findOne({
                            where: {
                                id: decoded.userNum
                            }
                        });
                        if (userInfo.isParentMember === true) {
                            childrenInfo = await childrenTable.findAll({
                                where: {
                                    parentId: decoded.userNum
                                }
                            });
                        }
                        res.status(200).send({
                            userName: userInfo.userName,
                            birthDate: userInfo.birthDate,
                            gender: userInfo.gender,
                            userId: userInfo.userId,
                            email: userInfo.email,
                            isParentMember: userInfo.isParentMember,
                            isSitterMember: userInfo.isSitterMember,
                            careAgeStart: userInfo.careAgeStart,
                            careAgeEnd: userInfo.careAgeEnd,
                            children: childrenInfo,
                            parentDesc: userInfo.parentDesc,
                            sitterDesc: userInfo.sitterDesc
                        });
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