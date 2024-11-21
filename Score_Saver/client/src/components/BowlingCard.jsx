import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const URL = "http://localhost:4000/api/v1";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BowlingCard = ({ data }) => {
  const { userData } = useContext(AuthContext);
  const { token } = userData;
  const navigate = useNavigate();
  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`${URL}/bowling/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      console.log(response);
      if (response.data.success === true) {
        navigate("/stat");
        toast.success("Deleted Successfully");
      } else {
        toast.error("Failed to Delete");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="card">
      <img
        src="https://lh3.googleusercontent.com/proxy/_nHQBX7tTUSSHJlQuEDlDDidgsOect1gkGsBZgYAe_8UviUWHsSyd8FYmdRLjwibjd5-wBfCKm7IDEl1ar5FNqHIV5s84l8BaXg6NR0zFY9fEIzbLUx0ug"
        alt=""
      />
      <div className="card-content">
        <h2>wickets : {data.wicketsTaken}</h2>
        <p>economy : {data.economy}</p>
        <p>runs given : {data.runsGiven}</p>
        <p>maiden : {data.maiden}</p>
        <p>opponent : {data.opponentClub}</p>
        {/* <p>venue : {data.venue}</p> */}
        <p>date : {data.date.split("T")[0]}</p>
      </div>

      <div className="options">
        <NavLink id="edit" to={`/editBowling/${data._id}`}>
          edit
        </NavLink>
        <button
          id="delete"
          onClick={() => {
            deleteData(data._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BowlingCard;
