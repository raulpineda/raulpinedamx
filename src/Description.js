import React from "react";
import "./Description.scss";
import Collapsible from "./Collapsible";
import AgeCalculator from "./AgeCalculator";

function Description() {
  return (
    <div className="Description">
      <Collapsible title={`const raulPineda={'{'}`} depthClass={0}>
        <span className="Description__level1">
          birthplace: "Guadalajara, Mexico",
        </span>
        <span className="Description__level1">
          currentResidence: "Copenhagen, Denmark",
        </span>
        <span className="Description__level1">
          age: <AgeCalculator />,
        </span>
        <Collapsible title="skills" type="object" depthClass="1">
          <Collapsible
            title="JavaScript"
            type="array"
            depthClass="Description__level2"
          >
            <span className="Description__level3">"React"</span>
            <span className="Description__level3">"Redux"</span>
            <span className="Description__level3">"Electron"</span>
            <span className="Description__level3">"Angular"</span>
          </Collapsible>
          <Collapsible
            title="backend"
            type="array"
            depthClass="Description__level2"
          >
            <span className="Description__level3">"NodeJS"</span>
            <span className="Description__level3">"Ruby on Rails"</span>
            <span className="Description__level3">"PHP"</span>
          </Collapsible>
        </Collapsible>
        <Collapsible
          title="experience"
          type="object"
          depthClass="Description__level1"
        >
          <Collapsible
            title="Saxo Bank"
            type="object"
            depthClass="Description__level2"
          >
            <span className="Description__level3">{`position: "Senior Front End Developer"`}</span>
            <span className="Description__level3">{`technologies: "React, Redux, Electron"`}</span>
            <Collapsible
              title="responsibilities"
              type="array"
              depthClass="Description__level3"
            >
              <span className="Description__level4">
                "Development SaxoTrader GO, SaxoTrader PRO, and Saxo Investor"
              </span>
              <span className="Description__level4">
                "Architecture, maintenance, and roadmap of the platform’s
                workspace management library - a module handling and lifecycle
                event manager"
              </span>
            </Collapsible>
            <span className="Description__level3">{`start: "September 2017"`}</span>
            <span className="Description__level3">{`end: null`}</span>
          </Collapsible>
        </Collapsible>
        <Collapsible
          title="likes"
          type="array"
          depthClass="Description__level1"
        >
          <span className="Description__level2">"cooking"</span>
          <span className="Description__level2">"wine"</span>
          <span className="Description__level2">"coffee"</span>
          <span className="Description__level2">"photography"</span>
          <span className="Description__level2">"bad jokes"</span>
          <span className="Description__level2">"travelling"</span>
        </Collapsible>
        <Collapsible
          title="languages"
          type="object"
          depthClass="Description__level1"
        >
          <span className="Description__level2">{`Spanish: { proficiency: "Native" }`}</span>
          <span className="Description__level2">{`English: { proficiency: "Bilingual" }`}</span>
          <span className="Description__level2">{`Danish: { proficiency: "Conversational" }`}</span>
          <span className="Description__level2">{`German: { proficiency: "Basic" }`}</span>
        </Collapsible>
        <span className="Description__level0">{`};`}</span>
      </Collapsible>
    </div>
  );
}

export default Description;
