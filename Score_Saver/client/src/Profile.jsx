import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./context/AuthContext";
const URL = "http://localhost:4000/api/v1";
const Profile = () => {
  const [stats, setStats] = useState({
    battingStat: [],
    bowlingStat: [],
  });
  const [isLoading,setIsLoading] = useState(true);
  const { userData } = useContext(AuthContext);
  const { token } = userData;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.data.success === true) {
        setStats((prev) => {
          return {
            ...prev,
            battingStat: response.data.battingStat,
            bowlingStat: response.data.bowlingStat,
          };
        });
        setIsLoading(false)
      } else {
        toast.error("Failed To Add Batting Details");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile">
      <div className="personal-detail">
        <img
          src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          id="profile-img"
        />
        <h2>@manu55</h2>
        <p>manu acharya</p>
        <p>Sunrisers Hyderbad</p>
      </div>

      <h1 id="Heading">Carrier Stat</h1>
      {!isLoading && (
        <div className="stats">
          <div className="batting">
            <div className="row">
              <p>Total Runs Scored</p>
              <h3>{stats.battingStat[0].totalRunsScored}</h3>
            </div>
            <div className="row">
              <p>Total Balls Played</p>
              <h3>{stats.battingStat[0].totalBallsPlayer}</h3>
            </div>
            <div className="row">
              <p>Strike Rate</p>
              <h3>
                {((stats.battingStat[0].totalRunsScored /
                  stats.battingStat[0].totalBallsPlayer) *
                  100).toFixed(2)}
              </h3>
            </div>
            <div className="row">
              <p>Average</p>
              <h3>
                {stats.battingStat[0].totalDismissed !== 0 ? (stats.battingStat[0].totalRunsScored /
                  stats.battingStat[0].totalDismissed) : 100}
              </h3>
            </div>
            <div className="row">
              <p>Total Fours</p>
              <h3>{stats.battingStat[0].totalFours}</h3>
            </div>
            <div className="row">
              <p>Total Sixers</p>
              <h3>{stats.battingStat[0].totalSixes}</h3>
            </div>
          </div>
          <div className="bowling">
            <div className="row">
              <p>Total Wickets Taken</p>
              <h3>{stats.bowlingStat[0].totalWicketsTaken}</h3>
            </div>
            <div className="row">
              <p>Economy Rate</p>
              <h3>{stats.bowlingStat[0].totalRunsGiven}</h3>
            </div>
            <div className="row">
              <p>Total Balls Bowled</p>
              <h3>
                {stats.bowlingStat[0].totalBallsBowled /
                  (stats.bowlingStat[0].totalBallsBowled / 6)}
              </h3>
            </div>
            <div className="row">
              <p>Total Runs Given</p>
              <h3>{stats.bowlingStat[0].totalRunsGiven}</h3>
            </div>
            <div className="row">
              <p>Total Overs Bowled</p>
              <h3>{stats.bowlingStat[0].totalBallsBowled / 6}</h3>
            </div>
            <div className="row">
              <p>Total Maiden Over</p>
              <h3>{stats.bowlingStat[0].totalMaidenOvers}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
