import React from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import TeamWork from "./TeamWork";
import TaskManagement from "./TaskManagement";
import Scheduling from "./Scheduling";
import Testimonial from "./Testimonial";
import Footer from "../../components/Footer";

function HomePage(props) {
  return (
    <div>
    <div id="backgroundContainer">
      <Header user={props.user} />
      <div id="textContainer">
        <div id="firstText">Instant collaborations for remote teams</div>
        <div id="secondText">
          All in one for your remote team chats, <br/> collaboration and track
          projects
        </div>
        <div id="accessInputContainer">
          <input id= "inputAccess" placeholder="Email" />
          <button id="buttonAccess">Get Early Access</button>
        </div>
      </div>
    </div>
    <TeamWork/>
    <TaskManagement/>
    <Scheduling/>
    <Testimonial/>
    <Footer/>
    </div>
    
    
  );
}

export default HomePage;
