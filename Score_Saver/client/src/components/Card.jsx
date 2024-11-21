import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const URL = "http://localhost:4000/api/v1";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Card = ({ data }) => {
  const { userData, setStat, stat } = useContext(AuthContext);
  const { token } = userData;
  const navigate = useNavigate();
  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`${URL}/batting/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      console.log(response)
      if (response.data.success === true) {
        navigate("/home");
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
        src="https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/primary/mpkqvclcpg3texaauqsd"
        alt=""
      />
      <div className="card-content">
        <h2>
          Runs : {data.runsScored} {!data.dissmissed && "*"}
        </h2>
        <p>Strikerate : {data.strikeRate}</p>
        <p>4's : {data.fours}</p>
        <p>6's : {data.sixes}</p>
        <p>opponent : {data.opponentClub}</p>
        {/* <p>venue : {data.venue}</p> */}
        <p>date : {data.date.split("T")[0]}</p>
      </div>

      <div className="options">
        <NavLink id="edit" to={`/editBatting/${data._id}`}>
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

export default Card;
