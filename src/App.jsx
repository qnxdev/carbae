import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Listing from "./components/Listing";

function App() {
  return (
    <Router>
      <Route path="/">
        <div className="App">
          <Header />
          <Listing />
        </div>
      </Route>
    </Router>
  );
}

export default App;
