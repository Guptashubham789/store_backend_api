const express=require('express');
const Vendor = require('../models/vendor');
const vendorRouter=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

vendorRouter.post('/api/vendor/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingEmail = await Vendor.findOne({email});
    if (existingEmail) {
      return res.status(400).json({ msg: "vendor with same email already exist" });
    } else {
      //genrate a salt with a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      //hash the password using the genrated salt
      const hashedPassword = await bcrypt.hash(password, salt);

      let vendor = new Vendor({fullName, email, password: hashedPassword });
      vendor = await vendor.save();
      res.json({vendor});
    }

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

vendorRouter.post('/api/vendor/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await Vendor.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ msg: "Vendor not found with this email" });
    } else {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      } else {
        const token = jwt.sign({ id: foundUser._id }, "PasswordKey");

        //remove sentitive information
        const { password, ...vendorWithoutPassword } = foundUser._doc;
        //send the response
        res.json({token,vendor:vendorWithoutPassword });

      }
    }

  } catch (e) {
    res.status(500).json({error:e.message});  
  }
});
module.exports=vendorRouter;