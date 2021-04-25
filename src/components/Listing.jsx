import { useEffect, useState } from "react";
import { CarItem } from "./CarItem";

export default function Listing() {
  const [cars, setCars] = useState([]);

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
  }, [cars.length]);

  if (cars && cars.length <= 0) {
    return "Loading";
  } else {
    return (
      <div className="listing">
        {cars.map((car) => (
          <CarItem car={car} />
        ))}
      </div>
    );
  }
}
