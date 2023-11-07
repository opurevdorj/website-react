import React from "react";
import "./TaskManagement.css";
import taskImage from "../../images/task-image.jpg";

function TaskManagement() {
  return (
    <div className="teamWorkContainer">
      <div>
        <img src={taskImage} height={600} style={{marginTop: '70px', marginBottom: '30px',}}/>
      </div>
      <div className="taskTextContainer">
        <div className="teamTitle">Simple task management</div>
        <div>
          Give everyone you work with—inside and outside your company—a more
          productive way to stay in sync. Respond faster with emoji, keep
          conversations focused in channels, and simplify all your communication
          into one place.
        </div>
        <button className="learnMoreButton">Learn More</button>
      </div>
    </div>
  );
}

export default TaskManagement;
