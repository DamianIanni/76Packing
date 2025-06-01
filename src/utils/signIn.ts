import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "@react-native-firebase/auth";
// import getAuth from "firebase/auth";
import { Platform } from "react-native";
// import { setUserAfterLogin } from "../redux/userSlice";

// Configurar Google Sign-In con el Web Client ID de Firebase
GoogleSignin.configure({
  webClientId: process.env.WEB_CLIENT_ID,
});

interface ResponseData {
  email: string;
  photoUrl: string | null;
  givenName: string | null;
  familyName: string | null;
}

export const getUserIdtoken = async () => {
  const auth = getAuth();
  const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
  return idToken;
};

export const signInWithGoogle = async (): Promise<
  ResponseData | boolean | void
> => {
  try {
    // Verificar si los servicios de Google Play están disponibles
    await GoogleSignin.hasPlayServices();
    Platform.OS === "android" && (await GoogleSignin.signOut());
    // Iniciar sesión con Google
    const userInfo = await GoogleSignin.signIn();
    // console.log("USER INFO", userInfo.data?.idToken);

    if (userInfo.type === "cancelled") return;

    // Obtener el token de acceso de Google
    const idToken = userInfo?.data?.idToken;
    if (!idToken) throw new Error("No se pudo obtener el idToken de Google.");

    // Crear una credencial de Firebase con el token de Google
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Obtener la instancia de autenticación de Firebase
    const auth = getAuth();
    if (auth.currentUser) {
      auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
        console.log("Token:", idToken); // <- este es el que funciona con tu backend
      });
      console.log("Usuario autenticado con éxito en Firebase");
    }
    // Iniciar sesión con Firebase usando la credencial de Google
    await signInWithCredential(auth, googleCredential);

    auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
      console.log("Token:", idToken); // <- este es el que funciona con tu backend
    });

    const userData = {
      // googleIdToken: userInfo.data.user.id,
      email: userInfo.data.user.email,
      photoUrl: userInfo.data.user.photo,
      givenName: userInfo.data.user.givenName,
      familyName: userInfo.data.user.familyName,
    };

    // Guardar los datos en Redux
    // dispatch(setUserAfterLogin(userData));
    return userData;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    console.log("Error details:", JSON.stringify(error, null, 2));
    return false;
  }
};
