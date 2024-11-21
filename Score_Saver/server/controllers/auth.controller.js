import mongoose from "mongoose";
import { Batting } from "../models/batting.model.js";
import { Bowling } from "../models/bowling.model.js";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, password, email, currentClub } =
      req.body;

    if (!firstname || !password || !email || !currentClub || !username) {
      throw new Error("Required Fields Are Empty");
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new Error(400, "User Already Exists");
    }

    const user = await User.create({
      firstname,
      lastname,
      username,
      password,
      email,
      currentClub,
    });

    res.send({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      throw new Error("invalid Credentials");
    }
    const valid = await existingUser.isPasswordCorrect(password);
    console.log(password, existingUser.password);
    if (!valid) {
      throw new Error("invalid credentials");
    }

    const jwttoken = await existingUser.generateToken();

    const user = await User.findById(existingUser._id).select("-password");

    res.send({ success: true, user, jwttoken });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const battingStat = await Batting.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(req.user._id) } // Replace 'someUserId' with the actual user ID
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalRunsScored: { $sum: "$runsScored" },
        totalBallsPlayer: { $sum: "$ballsPlayed" },
        totalFours: { $sum: "$fours" },
        totalSixes: { $sum: "$sixes" },
        totalDismissed: {
          $sum: {
            $cond: [{ $eq: ["$dismissed", true] }, 1, 0]
          }
        }
      },
    },
  ]);

  const bowlingStat = await Bowling.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(req.user._id) }
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalWicketsTaken: { $sum: "$wicketsTaken" },
        totalRunsGiven: { $sum: "$runsGiven"},
        totalBallsBowled: { $sum: "$ballsBowled" },
        totalMaidenOvers: { $sum: "$maiden" },
        
      },
    },
  ]);

  res.send({ success: true, user, battingStat, bowlingStat });
};
