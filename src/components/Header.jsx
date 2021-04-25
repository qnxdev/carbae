import { ORG_LOGO, ORG_NAME } from "../lib/constants";

export default () => {
  return <div className="header">
      <div className="logo">
          <img src={ORG_LOGO} alt="" width="50px"/>
          <h2>{ORG_NAME}</h2>
      </div>
      <div className="access">
          <img src='/location.png' alt="" width="50px"/>
          <img src='/search.png' alt="" width="50px"/>
      </div>
  </div>;
};
