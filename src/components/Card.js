import React from "react";
import StarIcon from "../icons/Star"

const convertNumberToArray = (number) => {
  const result = [];
  for (let i = 0; i <= number - 1; i++) {
    result.push(i);
  }
  return result;
};

function Card(props) {
    const {card} = props;
    const {stars, text, image, name} = card;
  return (
    <div
      style={{
        minWidth: "300px",
        backgroundColor: "white",
        paddingTop: "30px",
        paddingLeft: "30px",
        paddingRight: "42px",
        height: "300px",
        boxShadow: "0px 15px 35px 0px rgba(0, 0, 0, 0.25)"
      }}
    >
      <div style={{ paddingBottom: "20px" }}>
        {convertNumberToArray(stars).map((num) => {
          return <StarIcon key={num} />;
        })}
      </div>
      <div style={{paddingBottom: "50px", textAlign: "start"}}>{text}</div>
      <div style={{display: "flex", alignItems: "center"}}>
        <img width="56px" height="56px" src={image} alt=""/>
        <span style={{paddingLeft: "20px"}}>{name}</span>
      </div>
    </div>
  );
}

export default Card;
