const isEmail = require("isemail");
const User = require("../models/user.model");

const authRegister = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      ID,
      city,
      street,
      password,
      confirmPassword,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !ID ||
      !street ||
      !city ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).send({ message: "Missing Details" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must have at least 6 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords does not match" });
    }

    if (ID.toString().length !== 9) {
      return res.status(400).send({ message: "ID must have 9 number" });
    }

    if (!isEmail.validate(email)) {
      return res.status(400).send({ message: "Email is not valid" });
    }

    const userID = await User.find({ ID });
    if (userID.length) {
      return res.status(400).send({ message: "ID already exist" });
    }

    const userEmail = await User.find({ email });
    if (userEmail.length) {
      return res.status(400).send({ message: "Email already exist" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Something want wrong" });
  }
};

module.exports = authRegister;
