const Router = require("express");
const User = require("../models/User");
const Role = require("../models/Role");
const TaskCounter = require("../models/TaskCounter");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with this email already exists` });
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        email: email,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    // const userRole = new Role();
    // const adminRole = new Role({ value: "ADMIN" });
    // await adminRole.save();
    // await userRole.save();

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(404).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    res.send({ message: "Server error" });
  }
});

module.exports = router;
