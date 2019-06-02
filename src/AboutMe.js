import React from "react";
import profile from "./img/profile.png";
import profile2x from "./img/profile@2x.png";
import profile3x from "./img/profile@3x.png";
import "./AboutMe.scss";
import Description from "./Description";

function AboutMe() {
  return (
    <div className="AboutMe">
      <div className="AboutMe__header">
        <img
          className="AboutMe__picture"
          src={profile}
          srcSet={`${profile} 1x, ${profile2x} 2x, ${profile3x} 3x`}
          alt="Myself"
        />
        <h1 className="AboutMe__greeting">
          ¡Hola<span className="AboutMe__greeting--highlight">!</span>
        </h1>
      </div>
      <p className="AboutMe__description">
        My name is Raúl, I am a Front End Developer based in Copenhagen.
      </p>
      <h2 className="AboutMe__subtitle">Cool, tell me more about you.</h2>
      <Description />
      <p className="AboutMe__footer">
        <a href="https://www.github.com/raulpineda">
          <svg src="img/github.svg" fill="#00f" className="github" />
        </a>
        Created by Raúl in 2019
      </p>
    </div>
  );
}

export default AboutMe;
