import mongoose, { Schema } from "mongoose";

const battingDetailsSchema = new Schema(
  {
    playedClub: {
      type: String,
      required: true,
    },
    opponentClub: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    ballsPlayed: {
      type: Number,
      required: true,
      min: 0,
    },
    runsScored: {
      type: Number,
      required: true,
      min: 0,
    },
    strikeRate: {
      type: Number,
      required: true,
      min: 0,
    },
    fours: {
      type: Number,
      required: true,
      min: 0,
    },
    sixes: {
      type: Number,
      required: true,
      min: 0,
    },
    dissmissed:{
      type:Boolean,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Batting = mongoose.model("BattingDetails", battingDetailsSchema);

