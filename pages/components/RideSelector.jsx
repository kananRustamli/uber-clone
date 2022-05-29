import axios from "axios";
import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../../data/carlist";

const RideSelector = (props) => {
  const [ridePrice, setRidePrice] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await axios.get(
        `/${props.pickupCoords[0]},${props.pickupCoords[1]};${props.dropoffCoords[0]},${props.dropoffCoords[1]}`,
        {
          baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving/",
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
          },
        }
      );
      const duration = fetchedData.data.routes[0].duration;
      setRidePrice(duration / 200);
      console.log(ridePrice);
    };
    props.pickupCoords && props.dropoffCoords && ridePrice === 0 && loadData();
  }, [props]);

  return (
    <Wrapper>
      <Title>Choose A Ride</Title>
      <Carlist>
        {carList.map((car, index) => {
          return (
            <CarItem key={index}>
              <CarImage src={car.imgUrl} />
              <CarDetails>
                <CarTitle>{car.service}</CarTitle>
                <CarArriveTime>3 minutes</CarArriveTime>
              </CarDetails>
              <CarPrice>{(ridePrice * car.multiplier).toFixed(2)} $</CarPrice>
            </CarItem>
          );
        })}
      </Carlist>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex-1`;
const Title = tw.div`text-gray-500 text-center text-sm p-2 border-b`;
const Carlist = tw.div`h-1/2`;
const CarItem = tw.div`flex-1 flex p-4 items-center`;
const CarImage = tw.img`h-14 mr-2`;
const CarDetails = tw.div`flex-1`;
const CarTitle = tw.div`font-medium`;
const CarArriveTime = tw.div`text-xs text-blue-500`;
const CarPrice = tw.div`text-sm`;

export default RideSelector;
