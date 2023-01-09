import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    location,
    occupation,
    profilePic,
  } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: passwordHash,
    location,
    occupation,
    profilePic,
  });

  const savedUser = await newUser.save();

  if (savedUser) {
    return res.status(201).json(savedUser);
  } else {
    return res.status(501).json({error: new Error()});
  }
};

export const loginUser = async function (req, res, next) {
  const { username, password } = req.body;

  const userReq = await User.findOne({ username });

  if (!userReq) {
    return res.send(405).json({ error: "User does not exist" });
  } else {
    const matchPass = await bcrypt.compare(password, userReq.password);
    if (matchPass) {
      const token = jwt.sign({ id: userReq._id }, process.env.JWT_SECRET);
      req.currentUser = userReq;
      delete userReq.password;
      return res.status(201).json({ token, userReq });
    } else {
      return res.status(401).json({ error: "Wrong password" });
    }
  }
};
