import React from "react";
import "./Description.scss";
import Collapsible from "./Collapsible";
import AgeCalculator from "./AgeCalculator";

function Description() {
  return (
    <div className="Description">
      <Collapsible title="const raulPineda" type="object" isRoot>
        <span>birthplace: "Guadalajara, Mexico"</span>
        <span>currentResidence: "Copenhagen, Denmark"</span>
        <span>
          age: <AgeCalculator />
        </span>
        <Collapsible title="skills" type="object">
          <Collapsible title="JavaScript" type="array">
            <span>"React"</span>
            <span>"Redux"</span>
            <span>"Electron"</span>
            <span>"Angular"</span>
          </Collapsible>
          <Collapsible title="backend" type="array">
            <span>"NodeJS"</span>
            <span>"Ruby on Rails"</span>
            <span>"PHP"</span>
          </Collapsible>
        </Collapsible>
        <Collapsible title="experience" type="object">
          <Collapsible title="Saxo Bank" type="object">
            <span>{`position: "Senior Front End Developer"`}</span>
            <span>{`technologies: "React, Redux, Electron"`}</span>
            <Collapsible title="responsibilities" type="array">
              <span>
                "Development SaxoTrader GO, SaxoTrader PRO, and Saxo Investor"
              </span>
              <span>
                "Architecture, maintenance, and roadmap of the platform’s
                workspace management library - a module handling and lifecycle
                event manager"
              </span>
            </Collapsible>
            <span>{`start: "September 2017"`}</span>
            <span>{`end: null`}</span>
          </Collapsible>
        </Collapsible>
        <Collapsible title="likes" type="array">
          <span>"cooking"</span>
          <span>"wine"</span>
          <span>"coffee"</span>
          <span>"photography"</span>
          <span>"bad jokes"</span>
          <span>"travelling"</span>
        </Collapsible>
        <Collapsible title="languages" type="object">
          <span>{`Spanish: { proficiency: "Native" }`}</span>
          <span>{`English: { proficiency: "Bilingual" }`}</span>
          <span>{`Danish: { proficiency: "Conversational" }`}</span>
          <span>{`German: { proficiency: "Basic" }`}</span>
        </Collapsible>
      </Collapsible>
    </div>
  );
}

export default Description;
