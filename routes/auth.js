const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');


authRouter.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: "user with same email already exist" });
    } else {
      //genrate a salt with a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      //hash the password using the genrated salt
      const hashedPassword = await bcrypt.hash(password, salt);

      let user = new User({ fullName, email, password: hashedPassword });
      user = await user.save();
      res.json({ user });
    }

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//signin api

authRouter.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ msg: "User not found with this email" });
    } else {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      } else {
        const token = jwt.sign({ id: foundUser._id }, "PasswordKey");

        //remove sentitive information
        const { password, ...userWithoutPassword } = foundUser._doc;
        //send the response
        res.json({token, ...userWithoutPassword });

      }
    }

  } catch (e) {
    res.status(500).json({error:e.message});  
  }
});

module.exports = authRouter;