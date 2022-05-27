import axios from "axios";
import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../../data/carlist";

const RideSelector = (props) => {
  const [rideDuration, setRideDuration] = useState();
  const [ridePrice, setRidePrice] = useState();

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await axios.get(
        `/${props.pickupCoords};${props.dropoffCoords}`,
        {
          baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving/",
          params: {
            access_token: process.env.MAPBOX_TOKEN,
          },
        }
      );
      setRideDuration(fetchedData.data.routes[0].duration);
      setRidePrice((rideDuration / 100).toFixed(2));
    };
    props.pickupCoords && props.dropoffCoords && loadData();
  }, [props.pickupCoords, props.dropoffCoords]);

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
              <CarPrice>{ridePrice * car.multiplier} $</CarPrice>
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
