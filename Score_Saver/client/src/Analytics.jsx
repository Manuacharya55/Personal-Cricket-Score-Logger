import FoursAndSixes from "./components/Charts/Batting/FoursAndSixes.jsx";
import StrikeRate from "./components/Charts/Batting/StrikeRate";
import TotalBoundaries from "./components/Charts/Batting/TotalBoundaries";
import LastFiveMatches from "./components/Charts/Batting/LastFiveMatches";
import Wickets from "./components/Charts/Bowling/Wickets";
import Economy from "./components/Charts/Bowling/Economy";
import Maiden from "./components/Charts/Bowling/Maiden";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const URL = "http://localhost:4000/api/v1/analytics";
import axios from "axios";
import { AuthContext } from "./context/AuthContext.jsx";
const Analytics = () => {
  const [stat, setStat] = useState({
    runsScored: [],
    strikeRate: [],
    fours: [0],
    sixes: [0],
    wicketsTaken: [],
    economy: [],
    maiden: [],
  });

  const {userData} = useContext(AuthContext);
  const {token} = userData;
  const fetChAnalytics = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          "auth-token" : token
        },
      });

      if (response.data.success === true) {
        const updatedStat = {
          runsScored: response.data.batting.map((curEle) => curEle.runsScored),
          strikeRate: response.data.batting.map((curEle) => curEle.strikeRate),
          fours: response.data.batting.map((curEle) => curEle.fours),
          sixes: response.data.batting.map((curEle) => curEle.sixes),
          wicketsTaken: response.data.bowling.map(
            (curEle) => curEle.wicketsTaken
          ),
          economy: response.data.bowling.map((curEle) => curEle.economy),
          maiden: response.data.bowling.map((curEle) => curEle.maiden),
        };
        setStat(updatedStat);
      } else {
        toast.error("Failed To Batting Details");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetChAnalytics();
  }, []);

  return (
    <div className="analytics-holder">
      <div className="navigator">
        <NavLink to="/analytics/batting">Add Batting Details</NavLink>
        <NavLink to="/analytics/bowling">Add Bowling Details</NavLink>
      </div>
      <Outlet />
      <h1 id="Heading">Batting Statistics</h1>
      <div className="content">
        <div className="stat-card">
          <h2>Last 5 Matches</h2>
          <LastFiveMatches runsScored={stat.runsScored} />
        </div>
        <div className="stat-card">
          <h2>Total Boundaries</h2>
          <TotalBoundaries fours={stat.fours} sixes={stat.sixes} />
        </div>
        <div className="stat-card">
          <h2>Last 5 Matches Strike rate</h2>
          <StrikeRate strikeRate={stat.strikeRate} />
        </div>
        <div className="stat-card">
          <h2>Last 5 Matches 4's and 6's</h2>
          <FoursAndSixes fours={stat.fours} sixes={stat.sixes} />
        </div>
      </div>

      <h1 id="Heading">Bowling Statistics</h1>
      <div className="content">
        <div className="stat-card">
          <h2>Last 5 Matches</h2>
          <Wickets wicketsTaken={stat.wicketsTaken}/>
        </div>
        <div className="stat-card">
          <h2>Economy of 5 Matches</h2>
          <Economy economy={stat.economy}/>
        </div>
        <div className="stat-card">
          <h2>Maiden Overs</h2>
          <Maiden  maiden={stat.maiden}/>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
