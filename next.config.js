/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_TOKEN:
      "pk.eyJ1Ijoia25ucnN0bWwiLCJhIjoiY2wxeHJueXYyMDRlejNpbnMyNzBsYWF3cSJ9.0_PwbfEU5LIu33rS38jw5g",
    FIREBASE_API_KEY: "AIzaSyBnGEsw4Qn3wGxjoGo6rPrCmqtd6DfM0MY",
    FIREBASE_AUTH_DOMAIN: "uber-clone-2f431.firebaseapp.com",
    FIREBASE_MESSAGE_SENDER_ID: "949932655370",
    FIREBASE_APP_ID: "1:949932655370:web:f3bc961ebcb97260f930f3",
    FIREBASE_PROJECT_ID: "uber-clone-2f431",
    FIREBASE_STORAGE_BUCKET: "uber-clone-2f431.appspot.com",
  },
};

module.exports = nextConfig;
