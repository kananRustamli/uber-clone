import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import RideSelector from "./components/RideSelector";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const [pickupCoords, setPickupCoords] = useState();
  const [dropoffCoords, setDropoffCoords] = useState();

  useEffect(() => {
    getLocation(pickup, setPickupCoords);
    getLocation(dropoff, setDropoffCoords);
  }, []);

  useEffect(() => {
    console.log(pickupCoords);
    console.log(dropoffCoords);
  }, [pickupCoords, dropoffCoords]);

  const getLocation = async (location, callback) => {
    try {
      const data = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        {
          params: {
            access_token: process.env.MAPBOX_TOKEN,
            limit: 1,
          },
        }
      );
      callback(data.data.features[0].center);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <ButtonContainer>
          <Link href="/search">
            <BackButton src="/img/back.png" />
          </Link>
        </ButtonContainer>
        <Map pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} />
        <RideContainer>
          {pickupCoords && dropoffCoords && (
            <RideSelector
              pickupCoords={pickupCoords}
              dropoffCoords={dropoffCoords}
            />
          )}
          <ConfirmButtonContainer>
            <ConfirmButton>Confirm UberX</ConfirmButton>
          </ConfirmButtonContainer>
        </RideContainer>
      </Wrapper>
    </Container>
  );
};

const Container = tw.div`flex items-center justify-center width-screen `;
const Wrapper = tw.div`flex h-screen w-[480px] flex-col bg-white relative`;
const ButtonContainer = tw.div`bg-white absolute top-4 left-4 rounded-full shadow-md z-10`;
const BackButton = tw.img`h-full object-contain cursor-pointer`;
const RideContainer = tw.div`flex-1 flex flex-col`;
const ConfirmButtonContainer = tw.div`border-t-2`;
const ConfirmButton = tw.div`bg-black text-white my-4 mx-4 py-4 text-center text-xl`;

export default Confirm;
