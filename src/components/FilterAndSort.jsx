import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ORG_THEME_COLOUR_1 } from "../lib/constants";
import "../styles/components/FilterAndSort.css";
import { ExpandView, Option } from "./FilterComponents";

export default function FilterSort({ userPref, setUserPref }) {
  const [showSelector, setSelector] = useState("");
  const [view, setView] = useState("");

  const transmissionFunction = (type, value) => {
    setUserPref({
      filter: {
        ...userPref.filter,
        [type]: userPref.filter[type].includes(value)
          ? userPref.filter[type].filter((i) => i !== value)
          : [...userPref.filter[type], value],
      },
    });
  };

  return (
    <>
      {showSelector !== "" && (
        <div className="optionOverlay">
          <div className="overlayHeader header">
            <h2
              style={{
                borderBottomColor:
                  showSelector == "filter" ? ORG_THEME_COLOUR_1 : "#000",
              }}
            >
              Filter
            </h2>
            <img
              src="/icons/close.png"
              alt=""
              onClick={() => {
                setSelector("");
                setView("");
              }}
            />
          </div>
          {showSelector === "filter" && (
            <div className="overlayBody">
              <ExpandView view={view} setView={setView} name="Budget">
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="budget"
                  value="0l"
                >
                  <h1>&#8377;</h1>
                  <p>Less than 10 Lakh</p>
                </Option>
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="budget"
                  value="10l"
                >
                  <h1>&#8377;&#8377;</h1>
                  <p>10-25 Lakh</p>
                </Option>
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="budget"
                  value="25l"
                >
                  <h1>&#8377;&#8377;&#8377;</h1>
                  <p>More than 25 Lakh</p>
                </Option>
              </ExpandView>
              <ExpandView view={view} setView={setView} name="Body Type">
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="bodyType"
                  value="hatchback"
                >
                  <img src="/icons/hatchback.png" alt=""/>
                  <p>Hatchback</p>
                </Option>
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="bodyType"
                  value="sedan"
                >
                  <img src="/icons/sedan.png" alt=""/>
                  <p>Sedan</p>
                </Option>
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="bodyType"
                  value="suv"
                >
                  <img src="/icons/suv.png" alt=""/>
                  <p>SUV</p>
                </Option>
              </ExpandView>
              <ExpandView
                view={view}
                setView={setView}
                name="Transmission Type"
              >
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="transmission"
                  value="manual"
                  onClickFn={transmissionFunction}
                >
                  <p>Manual</p>
                </Option>
                <Option
                  userPref={userPref}
                  setUserPref={setUserPref}
                  type="transmission"
                  value="auto"
                  onClickFn={transmissionFunction}
                >
                  <p>Automatic</p>
                </Option>
              </ExpandView>
            </div>
          )}
        </div>
      )}

      <div className="buttonContainer">
        {showSelector == "" ? (
          <button
            className="filter button"
            onClick={() => setSelector("filter")}
          >
            <img src="/icons/filter.png" alt="" /> Filter
          </button>
        ) : (
          <button className="filter button" onClick={() => setSelector("")}>
            Search
          </button>
        )}
      </div>
      <style>{`
            .button{
                background-color: ${ORG_THEME_COLOUR_1};
            }
            
      `}</style>
    </>
  );
}
