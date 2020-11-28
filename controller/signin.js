let tokenExpireTime = "3h";

const jwt = require("jsonwebtoken");
const users = require("../models").User;
const crypto = require("crypto");

module.exports = {
  post: async (req, res) => {
    const { userId, password } = req.body;
    let encryptedPassword = crypto
      .createHash("sha256")
      .update(password + "momsitter")
      .digest("hex");
    let result = await users.findOne({
      where: {
        userId: userId
      },
    });
    if (result) {
      if (result.password === encryptedPassword) {
        try {
          let token = jwt.sign(
            {
              userNum: result.id,
            },
            'momsitter',
            {
              expiresIn: tokenExpireTime,
            }
          );
          res
            .status(200)
            .set("auth", `Bearer ${token}`)
            .send({ result: "Signin success" });
        } catch (err) {
          console.log(err);
          res.status(500).send({ result: "Server error" });
        }
      } else {
        res.status(400).send({ result: "Invalid password"});
      }
    } else {
      res.status(404).send({ result: "User does not exist" });
    }
  },
};