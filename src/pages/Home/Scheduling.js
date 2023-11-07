import React from "react";
import schedulingImage from "../../images/scheduling-image.jpg"

function Scheduling() {
  return (
    <div className="teamWorkContainer">
      <div className="teamWorkTextContainer">
        <div className="teamTitle">Scheduling that actually works</div>
        <div>
          Give everyone you work with—inside and outside your company—a more
          productive way to stay in sync. Respond faster with emoji, keep
          conversations focused in channels, and simplify all your communication
          into one place.
        </div>
        <button className="learnMoreButton">Learn More</button>
      </div>
      <img src={schedulingImage} height={600} style={{marginTop: '70px', marginBottom: '30px', marginRight: '60px'}}/>
    </div>
  );
}

export default Scheduling;
