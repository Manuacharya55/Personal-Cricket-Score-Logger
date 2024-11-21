import {useContext, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
const URL = "http://localhost:4000/api/v1";

const BowlingForm = () => {
  const { userData } = useContext(AuthContext);
  const { token } = userData;
  const navigate = useNavigate();
  const [bowling, setBowling] = useState({
    playedClub: "",
    opponentClub: "",
    date: "",
    venue: "",
    ballsBowled: "",
    wicketsTaken: "",
    maiden: "",
    runsGiven: "",
  });

  const handleChange = (e) => {
    setBowling((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/bowling`, bowling, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
  
      if (response.data.success === true) {
        toast.success("Bowling Details Added Successfully!");
      } else {
        toast.error("Failed To Add Bowling Details");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="stat-form"
      onSubmit={handleSubmit}
    >
      <h2>Log Bowling Stat</h2>
      <div className="form-group">
        <input
          type="text"
          name="playedClub"
          placeholder="Played Club (e.g., Sunrise Warriors)"
          required
          value={bowling.playedClub}
          onChange={handleChange}
        />

        <input
          type="text"
          name="opponentClub"
          placeholder="Opponent Club (e.g., Moonlight Challengers)"
          required
          value={bowling.opponentClub}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          name="date"
          required
          value={bowling.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="venue"
          placeholder="Venue (e.g., Greenfield Stadium)"
          required
          value={bowling.venue}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="ballsBowled"
          placeholder="Balls Bowled"
          min="0"
          required
          value={bowling.ballsBowled}
          onChange={handleChange}
        />

        <input
          type="number"
          name="wicketsTaken"
          placeholder="Wickets Taken"
          min="0"
          required
          value={bowling.wicketsTaken}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="maiden"
          placeholder="Maiden Overs"
          min="0"
          required
          value={bowling.maiden}
          onChange={handleChange}
        />

        <input
          type="number"
          name="runsGiven"
          placeholder="Runs Given"
          min="0"
          required
          value={bowling.runsGiven}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="form-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BowlingForm;
