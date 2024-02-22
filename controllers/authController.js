const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  const hashpassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({ username, password: hashpassword });
    res.status(201).json({ status: "success", data: { user: { username } } });
  } catch (error) {
    console.log(error, "uuuuuuuu");
    res.status(400).json({ status: "fail" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ status: "fail", message: "Not Found" });
    }

    const isCorret = bcrypt.compare(password, user.password);

    if (isCorret) {
      req.session.user = user;
      res.status(200).json({ status: "success" });
    } else {
      res.status(400).json({ status: "fail" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail" });
  }
};
