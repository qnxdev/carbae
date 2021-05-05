import { useEffect, useState } from "react";
import { connect } from "react-redux";
import carsAction from "../actions/carAction";
import { CarItem } from "./CarItem";
import FilterSort from "./FilterAndSort";
import Message from "./Message";
import useQueryParam from "./useQueryParam";

function Listing({ cars, setCars }) {
  const [budget, setBudget] = useQueryParam("budget", "");
  const [transmission, setTransmission] = useQueryParam("transmission", "");
  const [bodyType, setBodyType] = useQueryParam("bodyType", "");

  const [userPref, setUserPref] = useState({
    filter: {
      budget: budget !== "" ? budget.split("_") : [],
      bodyType: bodyType !== "" ? bodyType.split("_") : [],
      transmission: transmission !== "" ? transmission.split("_") : [],
    },
    sort: "",
  });
  const [budgetResObj, setBudgetResObj] = useState([]);
  const [transResObj, setTransResObj] = useState([]);
  const [bodyResObj, setBodyResObj] = useState([]);
  const [resObj, setResObj] = useState([]);

  const GetCars = async () => {
    const resp = await fetch(
      `https://6083a8f35dbd2c001757b9a7.mockapi.io/api/v1/cars`
    );
    setCars(await resp.json());
  };

  useEffect(() => {
    let res = [];
    for (let i = 0; i < cars.length; i++) {
      let flag = 0;
      if (userPref.filter.budget.length === 0) {
        res.push(cars[i]);
      } else {
        if (
          userPref.filter.budget.includes("0l") &&
          cars[i].price_starts < 1000000
        ) {
          res.push(cars[i]);
          flag = 1;
        }
        if (
          flag != 1 &&
          userPref.filter.budget.includes("10l") &&
          cars[i].price_starts >= 1000000 &&
          cars[i].price_starts < 2500000
        ) {
          res.push(cars[i]);
          flag = 1;
        }
        if (
          flag != 1 &&
          userPref.filter.budget.includes("25l") &&
          cars[i].price_starts > 2500000
        ) {
          res.push(cars[i]);
          flag = 1;
        }
      }
    }
    setBudgetResObj(res);
  }, [userPref.filter.budget, cars]);

  useEffect(() => {
    let res = [];
    for (let i = 0; i < cars.length; i++) {
      if (userPref.filter.bodyType.length === 0) {
        res.push(cars[i]);
      } else {
        if (userPref.filter.bodyType.includes(cars[i].body_type)) {
          res.push(cars[i]);
        }
      }
    }
    setBodyResObj(res);
  }, [userPref.filter.bodyType, cars]);

  useEffect(() => {
    let res = [];
    for (let i = 0; i < cars.length; i++) {
      if (userPref.filter.transmission.length === 0) {
        res.push(cars[i]);
      } else {
        if (
          userPref.filter.transmission.includes(cars[i].transmission_types) ||
          cars[i].transmission_types === "both"
        ) {
          res.push(cars[i]);
        }
      }
    }
    setTransResObj(res);
  }, [userPref.filter.transmission, cars]);

  useEffect(() => {
    let res = [];
    let i = 0;
    while (i < cars.length) {
      if (
        budgetResObj.includes(cars[i]) &&
        bodyResObj.includes(cars[i]) &&
        transResObj.includes(cars[i])
      ) {
        res.push(cars[i]);
      }
      i++;
    }
    setResObj(res);
  }, [budgetResObj, bodyResObj, transResObj]);

  useEffect(() => {
    if (userPref.filter.budget !== budget.split("_")) {
      setBudget(userPref.filter.budget.join("_"));
    }
    if (userPref.filter.bodyType !== bodyType.split("_")) {
      setBodyType(userPref.filter.bodyType.join("_"));
    }
    if (userPref.filter.transmission !== transmission.split("_")) {
      setTransmission(userPref.filter.transmission.join("_"));
    }
  }, [userPref]);

  useEffect(() => {
    if (cars && cars.length === 0) {
      GetCars();
    }
  }, [cars]);

  if (cars && cars.length <= 0) {
    return <Message message={"Loading..."} />;
  } else {
    return (
      <div className="listing">
        {cars.length !== 0 && resObj.length === 0 && (
          <Message message={"None available. Please change filter options."} />
        )}

        {resObj.map((car) => (
          <CarItem car={car} key={car.id} />
        ))}
        <FilterSort userPref={userPref} setUserPref={setUserPref} />
        <style>{`
            .listing{
              margin-top: 70px;
              margin-bottom: 50px;
            }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  setCars: (cars) => {
    dispatch(carsAction(cars));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
