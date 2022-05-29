import { useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/dist/client/link";

const Search = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  return (
    <Container>
      <Wrapper>
        <ButtonContainer>
          <Link href="/">
            <BackButton src="/img/back.png" alt="back" />
          </Link>
        </ButtonContainer>
        <InputContainer>
          <FromToIcons>
            <CircleImg src="/img/circle.png" alt="" />
            <LineImg src="img/line.png" alt="" />
            <SquareImg src="img/square.png" alt="" />
          </FromToIcons>
          <InputBoxes>
            <Input
              placeholder="Pick-up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <Input
              placeholder="Where to"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </InputBoxes>
          <PlusIcon src="/img/plus.png" alt="plus" />
        </InputContainer>
        <SavedPlaces>
          <StarIcon src="/img/star.png" alt="" />
          Saved Places
        </SavedPlaces>
        <Link
          href={{
            pathname: "/confirm",
            query: {
              pickup: pickup,
              dropoff: dropoff,
            },
          }}
        >
          <ConfirmLocation>Confirm Location</ConfirmLocation>
        </Link>
      </Wrapper>
    </Container>
  );
};

const Container = tw.div`flex justify-center width-screen`;
const Wrapper = tw.div`bg-grey-200 w-[480px] h-screen`;
const ButtonContainer = tw.div`bg-white px-4 h-12 `;
const BackButton = tw.img`cursor-pointer`;

const InputContainer = tw.div`bg-white flex items-center px-4 mb-2`;

const FromToIcons = tw.div`w-10 mr-2 flex flex-col items-center`;
const CircleImg = tw.img`h-2.5`;
const LineImg = tw.img`h-10`;
const SquareImg = tw.img`h-3`;

const InputBoxes = tw.div`flex flex-col flex-1`;
const Input = tw.input`
  bg-gray-200 rounded-2 outline-none border-none
  h-10 my-2 p-2
  flex-1
`;
const PlusIcon = tw.img`bg-gray-200 rounded-full w-10 h-10 ml-3`;

const SavedPlaces = tw.div`flex items-center bg-white px-4 py-2`;
const StarIcon = tw.img`
  bg-gray-400 rounded-full
  w-10 h-10 p-2 mr-2
`;

const ConfirmLocation = tw.div`
  bg-black text-white rounded-2
  mx-4 my-2 h-10
  flex items-center justify-center
  cursor-pointer
`;

export default Search;
