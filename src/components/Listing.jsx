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
      budget: budget != "" ? budget.split("_") : [],
      bodyType: bodyType != "" ? bodyType.split("_") : [],
      transmission: transmission != "" ? transmission.split("_") : [],
    },
    sort: "",
  });
  const [resObj, setResObj] = useState([]);

  const GetCars = async () => {
    const resp = await fetch(
      `https://6083a8f35dbd2c001757b9a7.mockapi.io/api/v1/cars`
    );
    setCars(await resp.json());
  };

  useEffect(() => {
    const results = cars.filter(function (car) {
      if (
        (userPref.filter.transmission.length == 0 || //No transmission selected
          userPref.filter.transmission.includes(car.transmission_types)) && //selected transmission included
        (userPref.filter.bodyType.length == 0 ||
          userPref.filter.bodyType.includes(car.body_type)) &&
        (userPref.filter.budget.length == 0 ||
          (userPref.filter.budget.includes("0l") &&
            car.price_starts <= 1000000)) &&
        (userPref.filter.budget.length == 0 ||
          (userPref.filter.budget.includes("10l") &&
            car.price_starts > 1000000 &&
            car.price_starts <= 2500000)) &&
        (userPref.filter.budget.length == 0 ||
          (userPref.filter.budget.includes("25l") &&
            car.price_starts > 2500000))
      ) {
        return car;
      }
    });
    setResObj(results);
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
        {cars.length !== 0 && resObj.length == 0 && (
          <Message message={"None available. Please change filter options."} />
        )}

        {resObj.map((car) => (
          <CarItem car={car} key={car.id} />
        ))}
        <FilterSort />
        <style>{`
            .listing{
              margin-top: 70px;
              margin-bottom: 20px;
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
