const users = require("../models").User;
const childrenTable = require("../models").children;
const crypto = require("crypto");

module.exports = {
  post: async (req, res) => {
    console.log(req.body);
    let encryptedPassword = crypto
      .createHash("sha256")
      .update(req.body.password + "momsitter")
      .digest("hex");

    let user = await users.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (user) {
      res.status(409).send({ result: "User already exists" });
    } else {
      try {
        await users.create({
            userName: req.body.userName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,     // 남자는 0, 여자는 1
            userId: req.body.userId,
            password: encryptedPassword,
            email: req.body.email,
            isParentMember: req.body.isParentMember,
            isSitterMember: req.body.isSitterMember,
            careAgeStart: req.body.careAgeStart,
            careAgeEnd: req.body.careAgeEnd,
            sitterDesc: null,
            parentDesc: null
        });
        if (req.body.isParentMember === true) {
            await users.update({ parentDesc: req.body.description }, {
                where: {
                    userId: req.body.userId
                }
            });
            let userInfo = await users.findOne({
                where: {
                    userId: req.body.userId
                }
            });
            for (let i in req.body.children) {
                await childrenTable.create({
                    parentId: userInfo.id,
                    birthDate: req.body.children[i].birthDate,
                    gender: req.body.children[i].gender
                });
            }
        } else {
            await users.update({ sitterDesc: req.body.description }, {
                where: {
                    userId: req.body.userId
                }
            });
        }
        res.status(201).send({ result: "Signup success" });
      } catch (err) {
        res.status(500).send({ result: "Server error" });
      }
    }
  },
};