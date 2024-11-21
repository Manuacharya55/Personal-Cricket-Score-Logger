import { useState, useEffect, useContext } from "react";
import Card from "./components/Card";
import { toast } from "react-toastify";
const URL = "http://localhost:4000/api/v1/stat";
import axios from "axios";
import BowlingCard from "./components/BowlingCard";
import { AuthContext } from "./context/AuthContext";

const Stat = () => {
  const { userData, stat, setStat } = useContext(AuthContext);
  const { token } = userData;
  const [tab, setTab] = useState("batting");
  const fetchPlayerStat = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.data.success === true) {
        setStat((prev) => {
          return {
            ...prev,
            batting: response.data.batting,
            bowling: response.data.bowling,
          };
        });
      } else {
        toast.error("Failed To Batting Details");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPlayerStat();
  }, []);

  const handleTab = () => {
    tab == "batting" ? setTab("bowling") : setTab("batting");
  };
  return (
    <>
      <div className="navigator">
        <button
          className={`${tab === "batting" ? "active" : ""}`}
          onClick={handleTab}
        >
          Batting
        </button>
        <button
          className={`${tab === "bowling" ? "active" : ""}`}
          onClick={handleTab}
        >
          Bowling
        </button>
      </div>
      <div
        className={`stat-container ${tab === "batting" ? "tab-active" : ""}`}
      >
        {stat.batting.map((curEle) => (
          <Card data={curEle} key={curEle._id} />
        ))}
      </div>
      <div
        className={`stat-container ${tab === "bowling" ? "tab-active" : ""}`}
      >
        {stat.bowling.map((curEle) => (
          <BowlingCard data={curEle} key={curEle._id} />
        ))}
      </div>
    </>
  );
};

export default Stat;
