import { createStore } from "redux";
import reducer from "./reducers/reducer";

function configureStore(state = { 
    cars: []
}) {
  return createStore(reducer, state);
}

export default configureStore;
