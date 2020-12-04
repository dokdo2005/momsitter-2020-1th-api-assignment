const users = require("../models").User;
const childrenTable = require("../models").children;
const crypto = require("crypto");

module.exports = {
  sitter: async (req, res) => {
    let user = await users.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (user) {
      res.status(409).send({ result: "User already exists" });
    } else {
      let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,}$/;    // 7자 이상, 영문 대소문자 및 숫자, 특수기호 포함
      if (req.body.password.match(regex)) {
        let encryptedPassword = crypto
          .createHash("sha256")
          .update(req.body.password + "momsitter")
          .digest("hex");
        try {
          await users.create({
              userName: req.body.userName,
              birthDate: req.body.birthDate,
              gender: req.body.gender,     // 남자는 0, 여자는 1
              userId: req.body.userId,
              password: encryptedPassword,
              email: req.body.email,
              isParentMember: false,
              isSitterMember: true,
              careAgeStart: req.body.careAgeStart,
              careAgeEnd: req.body.careAgeEnd,
              sitterDesc: req.body.description
            });
            res.status(201).send({ result: "Signup success" });
          } catch (err) {
            res.status(500).send({ result: "Server error" });
          }
      } else {
        res.status(400).send({ result: "Invalid password" });
      }
    }
  },
  parent: async (req, res) => {
    let user = await users.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (user) {
      res.status(409).send({ result: "User already exists" });
    } else {
      let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,}$/;    // 7자 이상, 영문 대소문자 및 숫자, 특수기호 포함
      if (req.body.password.match(regex)) {
        let encryptedPassword = crypto
          .createHash("sha256")
          .update(req.body.password + "momsitter")
          .digest("hex");
        try {
          await users.create({
              userName: req.body.userName,
              birthDate: req.body.birthDate,
              gender: req.body.gender,     // 남자는 0, 여자는 1
              userId: req.body.userId,
              password: encryptedPassword,
              email: req.body.email,
              isParentMember: true,
              isSitterMember: false,
              parentDesc: req.body.description
          });
          for (let i in req.body.children) {
            await childrenTable.create({
                parentId: userInfo.id,
                birthDate: req.body.children[i].birthDate,
                gender: req.body.children[i].gender
            });
          }
          res.status(201).send({ result: "Signup success" });
        } catch (err) {
          res.status(500).send({ result: "Server error" });
        }
      } else {
        res.status(400).send({ result: "Invalid password" });
      }
    }
  }
};