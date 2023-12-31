require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectionString =
  "mongodb+srv://nimrazahoor:(Nim786Zah)@cluster0.bzszl8a.mongodb.net/";
mongoose
  .connect(connectionString, connectionOptions)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  userType: {
    type: String,
    enum: ["Admin", "Candidate", "Voter"],
    required: true,
    default: "Voter",
  },
  constituency: {
    type: String,
  },

  cnic: { type: String, required: true, unique: true },
  picture: { type: String }, 
  isCandidate: { type: Boolean, default: false },
  isVoted: { type: Boolean, default: false },
  isInvited: { type: Boolean, default: false },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

const candidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  partyName: { type: String, required: true },
  partySymbol: { type: String },
  approved: { type: Boolean, default: false },
  voters: [
    {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
  ],
});
const constituencySchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true },
  location: { type: String },
  electionSchema: [{ type: mongoose.Schema.Types.ObjectId, ref: "Election" }],
});

const electionSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
});

const pollSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
  start_time: { type: Date },
  end_time: { type: Date },
  polling_duration: { type: Number },
});

const voteSchema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  constituency: { type: String },
});
const resultSchema = new mongoose.Schema({
  constituency:{type:mongoose.Schema.Types.ObjectId,ref:"Constituency",required:true,unique:true},
  name:{type:String},
  partyName:{type:String},
  total_votes:{type:Number},
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bycrpt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, "SECRET_KEY");

    this.tokens = this.tokens.concat({ token: token });
    this.save();
    return token;
  } catch (err) {
    console.log("Error while generating auth token", err);
  }
};

const User = mongoose.model("User", userSchema);
const Candidate = mongoose.model("Candidate", candidateSchema);
const Constituency = mongoose.model("constituency", constituencySchema);
const Poll = mongoose.model("Poll", pollSchema);
const Election = mongoose.model("Election", electionSchema);
const Vote = mongoose.model("Vote", voteSchema);
const Result = mongoose.model("Result",resultSchema);
module.exports = { User, Candidate, Constituency, Election, Vote, Poll, Result };
