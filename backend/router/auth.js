const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path'); 
const multer = require('multer');
const { User, Candidate } = require("../modals/modals");
const bcrypt = require('bcryptjs');
const authenticateUserByToken = require('../middleware/authenticate')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename of the uploaded image
  }
});

const upload = multer({ storage: storage, mkdir: true });

router.get("/", (req, res) => {
  res.send(`Hello from server auth.js`);
});

router.post("/signup",upload.single('picture'), async (req, res) => { 
  console.log("Request.body", req.body);

  let { username, email, password,  cnic,constituency ,picture} =
    req.body;
     picture = req.file.filename;
    console.log(username,email,password,cnic,constituency,"picture",picture)

  if (
    !username ||
    !email ||
    !password ||
   
    !cnic ||
    !constituency ||
    !picture
  )
   {
    console.log(username,email,password,cnic)
    return res.status(422).json("fill all the fields");
  }
  console.log("i am here the body", email, password);

  try {
    const userExists = await User.findOne({ email: email });
    const cnicExists = await User.findOne({cnic:cnic});
    const usernameExists = await User.findOne({username:username});
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
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to Register" });
  }
});


// In the login route, store the token in the session
router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await User.findOne({ email: email,userType:userType });
    console.log(userLogin)
    if (userLogin  !== undefined) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        console.log("Do not match")
        return res.status(400).json({ error: "invalid credentials" });
      } else {
        console.log("Will Generate Auth token")
        const token = await userLogin.generateAuthToken();
        console.log("token-------",token)
       
       req.session.token = token;
       console.log('req.session.token',req.session.token)
        return res.status(201).json({ message: "user login successfully" , token: token ,userType:userType});
      }
    }

    return res.status(400).json({ error: "invalid credentials" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// router/auth.js
router.post("/apply-candidate",authenticateUserByToken, upload.single('partySymbol'),async (req, res) => {
  try {
    const  partyName = req.body.partyName;
    console.log("req.body",req.body.partyName)
    const partySymbol = req.file.filename;
    console.log("party Symbol = ",partyName,"partyName",partySymbol);
    if (!partyName ,!partySymbol) {
      return res.status(401).json({ error: "Please provide party name and party symbol" });
    }
    const userId= req.userId;
    const candidate = new Candidate({
      user:userId,
      partyName:partyName,
      approved:false,
      partySymbol:partySymbol
    });

    await candidate.save();
    console.log("new candidate",candidate)
    res.status(201).json({ message: "Candidate Applied Successfully" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
