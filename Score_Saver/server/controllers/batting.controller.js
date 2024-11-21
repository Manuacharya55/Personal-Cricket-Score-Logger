import { Batting } from "../models/batting.model.js";
import { Bowling } from "../models/bowling.model.js";

const createObject = (obj, userId) => {
  const {
    playedClub,
    opponentClub,
    date,
    venue,
    ballsPlayed,
    runsScored,
    fours,
    sixes,
    dissmissed,
  } = obj;

  if (
    !playedClub ||
    !opponentClub ||
    !date ||
    !venue ||
    !ballsPlayed >= 0 ||
    !runsScored >= 0 ||
    !fours >= 0 ||
    !sixes >= 0
  ) {
    throw new Error("Fields Are Missing");
  }

  const strikeRate = (runsScored / ballsPlayed) * 100;

  return {
    playedClub,
    opponentClub,
    date,
    venue,
    ballsPlayed,
    runsScored,
    fours,
    sixes,
    dissmissed,
    strikeRate,
    userId,
  };
};

// Batting Details
const getBattingAndBowlingStat = async (req, res) => {
  const batting = await Batting.find({ userId: req.user._id });
  const bowling = await Bowling.find({ userId: req.user._id });

  res.status(200).send({
    success: true,
    length: batting.length,
    batting: batting,
    length: bowling.length,
    bowling: bowling,
  });
};

const addBattingDetails = async (req, res) => {
  try {
    const battingObject = createObject(req.body, req.user._id);
    const batting = await Batting.create(battingObject);
    res.status(201).send({
      success: true,
      data: batting,
    });
  } catch (error) {
    res.status(201).send({
      success: false,
      message: error.message,
    });
  }
};

const editBattingDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const existingData = await Batting.findById(id);
    if (!existingData) throw new Error("couldnt find data");

    const battingObject = createObject(req.body, req.user._id);
    const batting = await Batting.findByIdAndUpdate(
      id,
      { $set: battingObject },
      { new: true }
    );
    res.status(200).send({
      success: true,
      data: batting,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBattingDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Batting.findByIdAndDelete(id);
    if (!result) throw new Error("couldnt find data");
    res.status(200).send({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getBowlingAndBattingAnalytics = async (req, res) => {
  try {
    const bowling = await Bowling.find({ userId: req.user._id })
      .select("wicketsTaken economy maiden")
      .limit(5);
    const batting = await Batting.find({ userId: req.user._id })
      .select("runsScored strikeRate fours sixes")
      .limit(5);

    res.send({
      success: true,
      bowling,
      batting,
    });
  } catch (error) {
    console.log(error);
  }
};
// Export functions if using in another file
export {
  getBattingAndBowlingStat,
  addBattingDetails,
  editBattingDetails,
  deleteBattingDetails,
  getBowlingAndBattingAnalytics,
};
