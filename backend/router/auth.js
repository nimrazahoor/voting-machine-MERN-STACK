const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { User, Candidate } = require("../modals/modals");
const authenticateUserByToken = require("../middleware/authenticate");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dsz0qytqq",
  api_key: "933494115572752",
  api_secret: "IE3OKTL8AYUzIlG0gSmOe77EyY8",
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images", 
    allowed_formats: ["jpg", "jpeg", "png"], 
  },
});

const upload = multer({ storage: cloudinaryStorage });

router.get("/", (req, res) => {
  res.send(`Hello from server auth.js`);
});

router.post("/signup", upload.single("picture"), async (req, res) => {

  let { username, email, password, cnic, constituency, picture } = req.body;
  picture = req.file.filename;

  if (!username || !email || !password || !cnic || !constituency || !picture) {
    return res.status(422).json("fill all the fields");
  }

  try {
    const userExists = await User.findOne({ email: email });
    const cnicExists = await User.findOne({ cnic: cnic });
    const usernameExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(422).json({ message: "Email Exists" });
    }
    if (cnicExists) {
      return res.status(422).json({ message: "CNIC Exists" });
    }
    if (usernameExists) {
      return res.status(422).json({ message: "userName Exists" });
    }

    const user = new User({
      username: username,
      email: email,
      password: password,
      constituency: constituency,
      picture: picture,
      cnic: cnic,
    });

    await user.save();
    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
   return res.status(500).json({ error: "Failed to Register" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await User.findOne({ email: email, userType: userType });
    if (userLogin !== undefined) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.status(400).json({ error: "invalid credentials" });
      } else {
        const token = await userLogin.generateAuthToken();
        req.session.token = token;
        return res.status(201).json({
          message: "User login successfully",
          token: token,
          userType: userType,
        });
      }
    }

    return res.status(400).json({ error: "invalid credentials" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post(
  "/apply-candidate",
  authenticateUserByToken,
  upload.single("partySymbol"),
  async (req, res) => {
    try {
      const user = req.userId;
      const candidates = await Candidate.find({
        user: { $in: user },
        
      })
      
      .catch((error) => {
        console.error("Error fetching candidates:", error);
        
      });

      if (candidates.length!=0) 
      {
        return res
          .status(404)
          .json({ message: "One User can make only one party" });
      }

      const partyName = req.body.partyName;
      const alreadyExists = await Candidate.find({ partyName: partyName });

      if (!alreadyExists) {
        return res
          .status(400)
          .json({ message: "Party with this name already exist" });
      }

      const pictureURL = req.file.secure_url;
      const partySymbol = req.file.filename;
      if ((!partyName, !partySymbol)) {
        return res
          .status(401)
          .json({ error: "Please provide party name and party symbol" });
      }
      const userId = req.userId;
      const candidate = new Candidate({
        user: userId,
        partyName: partyName,
        approved: false,
        partySymbol: partySymbol,
      });

      await candidate.save();
      res.status(201).json({ message: "Candidate Applied Successfully" ,
      pictureURL: pictureURL,
      
    });

    } catch (err) {
      console.log("Error", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
module.exports = router;
