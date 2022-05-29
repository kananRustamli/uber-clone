import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";

import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Map />
        <ActionItems>
          <Header>
            <Logo src="img/Uber_Logo.svg" alt="Logo" />
            <UserProfile>
              <UserProfileName>{user && user.name}</UserProfileName>
              <UserProfileImage
                src={user && user.photoURL}
                alt="Profile Image"
                onClick={() => signOut(auth)}
              />
            </UserProfile>
          </Header>
          <ActionButtons>
            <Link href="/search">
              <ActionButton>
                <ActionImage src="img/uberx.png" alt="Ride" />
                Ride
              </ActionButton>
            </Link>
            <ActionButton>
              <ActionImage src="img/bike.png" alt="Bike" />
              Wheels
            </ActionButton>
            <ActionButton>
              <ActionImage src="img/uberschedule.png" alt="Reserve" />
              Reserve
            </ActionButton>
          </ActionButtons>
          <InputButton>
            <Link href="/search">Where to?...</Link>
          </InputButton>
        </ActionItems>
      </Wrapper>
    </Container>
  );
}

const Container = tw.div`flex items-center justify-center width-screen bg-gray-500`;
const Wrapper = tw.div`flex flex-col h-screen w-[480px] bg-white`;

const ActionItems = tw.div`flex-1 p-4`;
const Header = tw.div`flex justify-between items-center`;
const Logo = tw.img`h-20 p-4`;

const UserProfile = tw.div`flex items-center`;
const UserProfileImage = tw.img`h-12 w-12 rounded-full cursor-pointer`;
const UserProfileName = tw.div`mr-4 w-24 text-sm text-right`;

const ActionButtons = tw.div`flex`;
const ActionButton = tw.div`
  bg-grey-200 rounded-lg cursor-pointer
  m-1 h-32
  text-xl
  flex flex-col flex-1 gap-2
  justify-center items-center
  transform transition
  hover:scale-105
`;
const ActionImage = tw.img`h-3/5`;

const InputButton = tw.div`
  bg-gray-200
  h-20 p-4 mt-8
  text-2xl
  flex items-center cursor-pointer
`;
