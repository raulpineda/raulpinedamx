import React from "react";
import profile from "./img/profile.png";
import profile2x from "./img/profile@2x.png";
import profile3x from "./img/profile@3x.png";
import "./AboutMe.scss";
import Description from "./Description";

function AboutMe() {
  return (
    <div className="AboutMe">
      <img
        className="AboutMe__picture"
        src={profile}
        srcSet={`${profile} 1x, ${profile2x} 2x, ${profile3x} 3x`}
        alt="Myself"
      />
      <h1 className="AboutMe__greeting">
        ¡Hola<span className="AboutMe__greeting--highlight">!</span>
      </h1>
      <p className="AboutMe__description">
        My name is Raúl, I am a Front End Developer based in Copenhagen.
      </p>
      <h2 className="AboutMe__subtitle">Cool, tell me more about you.</h2>
      <Description />
    </div>
  );
}

export default AboutMe;
