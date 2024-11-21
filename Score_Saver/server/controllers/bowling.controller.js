import { Bowling } from "../models/bowling.model.js";

const createObject = (obj, userId) => {
  const {
    playedClub,
    opponentClub,
    date,
    venue,
    ballsBowled,
    wicketsTaken,
    maiden,
    runsGiven,
  } = obj;

  console.log({
    playedClub,
    opponentClub,
    date,
    venue,
    ballsBowled,
    wicketsTaken,
    maiden,
    runsGiven,
  });
  if (
    !playedClub ||
    !opponentClub ||
    !date ||
    !venue ||
    !ballsBowled >= 0 ||
    !wicketsTaken >= 0 ||
    !maiden >= 0 ||
    runsGiven >= 0
  ) {
    throw new Error("Fields Are Missing");
  }

  const overs = Number.parseFloat(
    `${Math.floor(ballsBowled / 6)}.${ballsBowled % 6}`
  );
  const economy = runsGiven / overs;

  return {
    playedClub,
    opponentClub,
    date,
    venue,
    ballsBowled,
    overs,
    wicketsTaken,
    economy,
    maiden,
    runsGiven,
    userId,
  };
};

const getBowlingDetails = async (req, res) => {
  const bowling = await Bowling.find();

  res.status(200).send({
    success: true,
    length: bowling.length,
    data: bowling,
  });
};

const addBowlingDetails = async (req, res) => {
  try {
    const bowlingObject = createObject(req.body, req.user._id);
    const bowling = await Bowling.create(bowlingObject);
    res.status(201).send({
      success: true,
      data: bowling,
    });
  } catch (error) {
    console.log(error);
  }
};

const editBowlingDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const existingData = await Bowling.findById(id);
    if (!existingData) throw new Error("couldnt find data");

    const bowlingObject = createObject(req.body);
    const bowling = await Bowling.findByIdAndUpdate(
      id,
      { $set: bowlingObject },
      { new: true }
    );
    res.status(200).send({
      success: true,
      data: bowling,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBowlingDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Bowling.findByIdAndDelete(id);
    if (!result) throw new Error("couldnt find data");
    res.status(200).send({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getBowlingDetails,
  addBowlingDetails,
  editBowlingDetails,
  deleteBowlingDetails,
};
