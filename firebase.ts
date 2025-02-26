import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAQkl6-3r_vtR3sBhp_Wff6n1Oz6dI1cYk",
  projectId: "packing76-c5925",
  storageBucket: "packing76-c5925.appspot.com",
  messagingSenderId: "141645736683",
  appId:
    Platform.OS === "android"
      ? "1:141645736683:android:03632ffdce6b035e6becae"
      : "1:141645736683:ios:0099a12ab7333bf26becae",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configurar Google Sign-In
GoogleSignin.configure({
  webClientId: "TU_WEB_CLIENT_ID", // Lo sacas de Firebase Console > Configuración de proyecto > Cuentas OAuth 2.0
});

export { auth };
