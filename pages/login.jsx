import { useEffect } from "react";
import tw from "tailwind-styled-components";

import { useRouter } from "next/router";

import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { authProvider, auth } from "../firebase";

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <UberLogo src={/img/Uber_logo.svg} alt="" />
        <Title>Log in to your Google accout to continue..</Title>
        <Image src="/img/login-image.png" alt="" />
        <SignInButton onClick={() => signInWithPopup(auth, authProvider)}>
          Sign in with Google
        </SignInButton>
      </Wrapper>
    </Container>
  );
};

const Container = tw.div`flex items-center justify-center width-screen`;
const Wrapper = tw.div`flex flex-col width-[480px] height-screen bg-gray-200 p-4`;
const SignInButton = tw.button`bg-black text-white text-center py-4 mt-8`;
const UberLogo = tw.img`h-12 self-start`;
const Title = tw.div`text-3xl pt-4 text-gray-500`;
const Image = tw.img`h-48 object-contain`;

export default Login;
