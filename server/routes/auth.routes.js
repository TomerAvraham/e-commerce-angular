const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRegister = require("../middlewares/register.middleware");

const generateToken = (user) => {
  user.password = "****";
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Missing details" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not exist" });
    }

    if (await bcrypt.compare(user.password, password)) {
      return res.status(400).send({ message: "Password isn't correct" });
    }

    const token = generateToken(user);

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/register", authRegister, async (req, res) => {
  try {
    const { first_name, last_name, email, ID, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      ID,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
