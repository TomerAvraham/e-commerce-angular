const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRegister = require("../middlewares/register.middleware");

const generateToken = (user) => {
  user.password && (user.password = "****");
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

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).send({ message: "Password isn't correct" });
    }

    const access_token = generateToken(user);

    res.status(200).send({ access_token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/register", authRegister, async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      ID,
      password,
      city,
      street,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      ID,
      city,
      street,
      password: hashedPassword,
    });

    await newUser.save();

    const access_token = generateToken(newUser);
    res.status(201).send({ access_token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/emailExist/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.status(200).send({ emailExists: emailExists.email });
    } else {
      res.status(200).send(null);
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/IDExist/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const IDExists = await User.findOne({ ID });

    if (IDExists) {
      res.status(200).send({ IDExists: IDExists.ID });
    } else {
      res.status(200).send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

module.exports = router;
