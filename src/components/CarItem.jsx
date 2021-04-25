export const CarItem = ({ car }) => {
  const varientCount =
    (car.transmission_types === "both" ? 2 : 0) +
    (car.fuel_types === "both" ? 2 : 1);

  return (
    <div  className="listItem">
      <img src={car.main_image} alt="Not available" />
      <div className="carDetail">
        <p>{car.name}</p>
        <h4>
          &#8377;
          {` ${Math.floor(car.price_starts / 1000) / 100} - ${
            Math.floor(car.price_ends / 1000) / 100
          } Lakh`}
        </h4>
        <p>{`${varientCount} varient${varientCount !== 1 ? "s" : ""}`}</p>
      </div>
    </div>
  );
};
