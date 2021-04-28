import { useState } from "react";
import { ORG_THEME_COLOUR_1 } from "../lib/constants";
import "../styles/components/FilterAndSort.css";

export default function FilterSort({ userPref, setUserPref }) {
  const [showSelector, setSelector] = useState("");
  const [view, setView] = useState("");

  const ExpandView = ({ name, children }) => (
    <div className="expandView">
      <div
        className="expandHead"
        onClick={() => setView(view == name ? "" : name)}
      >
        <h3>{name}</h3>
      </div>
      {view == name && <div className="expandBody">{children}</div>}
    </div>
  );
  return (
    <>
      {showSelector != "" && (
        <div className="optionOverlay">
          <div className="overlayHeader">
            <h2>Filter</h2>
          </div>
          {showSelector == "filter" && (
            <div className="filterOverlay">
              <ExpandView name="Budget">
                  <p>Less than 10 lakh</p>
                  <p>Less than 10 lakh</p>
              </ExpandView>
              <ExpandView name="Body Type"></ExpandView>
              <ExpandView name="Transmission Type"></ExpandView>
            </div>
          )}
        </div>
      )}

      <div className="buttonContainer">
        <button className="filter button" onClick={() => setSelector("filter")}>
          <img src="/icons/filter.png" /> Filter
        </button>
      </div>
      <style>{`
            .button{
                background-color: ${ORG_THEME_COLOUR_1};
            }
            
      `}</style>
    </>
  );
}
