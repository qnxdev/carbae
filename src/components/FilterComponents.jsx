import { ORG_THEME_COLOUR_1 } from "../lib/constants";
import "../styles/components/OverlayComponents.css";

export const ExpandView = ({ view, setView, name, children }) => (
  <div className="expandView">
    <div className="expandContainer">
      <div
        className="expandHead"
        onClick={() => setView(view === name ? "" : name)}
      >
        <h3>{name}</h3>
        <img src="/icons/down-arrow.png" alt="" />
      </div>
      {view === name && <div className="expandBody">{children}</div>}
    </div>
  </div>
);

export const Option = ({
  userPref,
  setUserPref,
  type,
  value,
  onClickFn,
  children,
}) => (
  <div
    className="option"
    onClick={() =>
      onClickFn
        ? onClickFn(type, value)
        : setUserPref({
            filter: {
              ...userPref.filter,
              [type]: userPref.filter[type].includes(value)
                ? userPref.filter[type].filter((i) => i !== value)
                : [...userPref.filter[type], value],
            },
          })
    }
    style={
      userPref.filter[type].includes(value)
        ? {
            borderColor: ORG_THEME_COLOUR_1,
            backgroundColor: "#fcf2f4",
            height: type == "transmission" ? "100%" : "80px",
          }
        : {
            borderColor: "#eee",
            backgroundColor: "#fff",
            height: type == "transmission" ? "100%" : "80px",
          }
    }
  >
    {children}
  </div>
);
