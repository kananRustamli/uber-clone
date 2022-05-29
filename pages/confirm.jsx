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

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  useEffect(() => {
    getPickup();
    getDropoff();
  });

  const getPickup = async () => {
    try {
      const data = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json`,
        {
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            limit: 1,
          },
        }
      );
      setPickupCoords(data.data.features[0].center);
    } catch (error) {
      console.log(error);
    }
  };

  const getDropoff = async () => {
    try {
      const data = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json`,
        {
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            limit: 1,
          },
        }
      );
      setDropoffCoords(data.data.features[0].center);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <ButtonContainer>
          <Link href="/search">
            <BackButton src="/img/back.png" alt="back" />
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
