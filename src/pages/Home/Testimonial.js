import React, { useState } from "react";
import "./Testimonial.css";
import Card from "../../components/Card";
import testimonialData from "./testimonial-data";
import Next from "../../icons/NextButton";
import Prev from "../../icons/PrevButton";

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const disablePrevButton = currentIndex === 0;
  const disableNextButton = currentIndex === testimonialData.length - 3;
  return (
    <div className="testimonialContainer">
      <div className="subContainer">
        <div className="titleContainer">What people say about us</div>
        <div className="cardContainer">
          <div
            style={{
              display: "flex",
              gap: "30px",
              width: `${testimonialData.length * 400}px`,
              transform: `translateX(-${currentIndex * 400}px)`,
            }}
          >
            {testimonialData.map((card, index) => {
              return <Card card={card} key={index} />;
            })}
          </div>
          <div>
            <button style={{border: "none"}}onClick={handlePrev} disabled={disablePrevButton}>
              <Prev />
            </button>
            <button style={{border: "none"}}onClick={handleNext} disabled={disableNextButton}>
              <Next />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
