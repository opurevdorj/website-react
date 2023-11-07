import React from "react";
import "./TeamWork.css"
import meetingImage from "../../images/meeting-image.png";

function TeamWork() {
  return (
    <div className="teamWorkContainer">
      <div className="teamWorkTextContainer">
        <div className="teamTitle">Your Hub for TeamWork</div>
        <div>
          Give everyone you work with—inside and outside your company—a more
          productive way to stay in sync. Respond faster with emoji, keep
          conversations focused in channels, and simplify all your communication
          into one place.
        </div>
        <button className="learnMoreButton">Learn More</button>
      </div>
      <img src={meetingImage} height={700} style={{backgroundColor: "#F5F7FA", boxShadow: "0px 15px 35px 0px rgba(0, 0, 0, 0.25)"}} alt=""/>
    </div>
  );
}

export default TeamWork;
