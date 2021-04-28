import { ORG_LOGO, ORG_NAME } from "../lib/constants";
import "../styles/components/Header.css";

export default () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={ORG_LOGO} alt="" />
        <h2>{ORG_NAME}</h2>
      </div>
      <div className="access">
        <img onClick={()=>alert("Location Access")} src="/icons/location.png" alt="" />
        <img onClick={()=>alert("Search")} src="/icons/search.png" alt="" />
      </div>
    </header>
  );
};
