import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
const URL = "http://localhost:4000/api/v1";

const BattingForm = () => {
  const { userData } = useContext(AuthContext);
  const { token } = userData;
  const navigate = useNavigate();
  const [batting, setBatting] = useState({
    playedClub: "",
    opponentClub: "",
    date: "",
    venue: "",
    ballsPlayed: "",
    runsScored: "",
    fours: "",
    sixes: "",
    dissmissed: "",
  });

  const handleChange = (e) => {
    setBatting((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/batting`, batting, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.data.success === true) {
        toast.success("Batting Details Added Successfully!");
        // navigate("/analytics");
      } else {
        toast.error("Failed To Add Batting Details");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="stat-form" onSubmit={handleSubmit}>
      <h2>Log Batting Stat</h2>
      <div className="form-group">
        <input
          type="text"
          name="playedClub"
          placeholder="Played Club (e.g., Team A)"
          required
          value={batting.playedClub}
          onChange={handleChange}
        />

        <input
          type="text"
          name="opponentClub"
          placeholder="Opponent Club (e.g., Team B)"
          value={batting.opponentClub}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          name="date"
          required
          value={batting.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue (e.g., City Stadium)"
          required
          value={batting.venue}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="ballsPlayed"
          placeholder="Balls Played"
          min="0"
          required
          value={batting.ballsPlayed}
          onChange={handleChange}
        />

        <input
          type="number"
          name="runsScored"
          placeholder="Runs Scored"
          min="0"
          required
          value={batting.runsScored}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="fours"
          placeholder="Fours Hit"
          min="0"
          required
          value={batting.fours}
          onChange={handleChange}
        />

        <input
          type="number"
          name="sixes"
          placeholder="Sixes Hit"
          min="0"
          required
          value={batting.sixes}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <select
          name="dissmissed"
          required
          value={batting.dissmissed}
          onChange={handleChange}
        >
          <option value="true">Dismissed</option>
          <option value="false">Not Dismissed</option>
        </select>
      </div>
      <div>
        <button className="form-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BattingForm;
