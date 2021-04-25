import { useEffect} from "react";
import { connect } from "react-redux";
import carsAction from "../actions/carAction";
import { CarItem } from "./CarItem";

function Listing({ cars, setCars }) {
    console.log(cars);
  const GetCars = async () => {
    const resp = await fetch(
      `https://6083a8f35dbd2c001757b9a7.mockapi.io/api/v1/cars`
    );
    setCars(await resp.json());
  };

  useEffect(() => {
    if (cars && cars.length === 0) {
      GetCars();
    }
  }, [cars]);

  if (cars && cars.length <= 0) {
    return "Loading";
  } else {
    return (
      <div className="listing">
        {cars.map((car) => (
          <CarItem car={car} key={car.id}/>
        ))}
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
