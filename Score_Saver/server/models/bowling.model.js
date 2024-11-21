import mongoose, { Schema } from "mongoose";

const BowlingDetailsSchema = new Schema(
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
    ballsBowled: {
      type: Number,
      required: true,
      min: 0,
    },
    overs: {
      type: Number,
      required: true,
      min: 0,
    },
    wicketsTaken: {
      type: Number,
      required: true,
      min: 0,
    },
    economy: {
      type: Number,
      required: true,
      min: 0,
    },
    maiden: {
      type: Number,
      required: true,
      min: 0,
    },
    runsGiven:{
      type:Number,
      required: true,
      min:0,
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

export const Bowling = mongoose.model("BowlingDetails", BowlingDetailsSchema);

