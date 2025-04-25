import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "@react-native-firebase/auth";
// import getAuth from "firebase/auth";
import { Platform } from "react-native";

import { setUser } from "../redux/userSlice";

// Configurar Google Sign-In con el Web Client ID de Firebase
GoogleSignin.configure({
  webClientId: process.env.WEB_CLIENT_ID,
});

export const signInWithGoogle = async (
  dispatch: any
): Promise<void | boolean> => {
  try {
    // Verificar si los servicios de Google Play están disponibles
    await GoogleSignin.hasPlayServices();
    Platform.OS === "android" && (await GoogleSignin.signOut());
    // Iniciar sesión con Google
    const userInfo = await GoogleSignin.signIn();
    console.log("USER INFO", userInfo.data?.idToken);

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
    }
    // Iniciar sesión con Firebase usando la credencial de Google
    await signInWithCredential(auth, googleCredential);

    console.log("Usuario autenticado con éxito en Firebase");
    auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
      console.log("Token:", idToken); // <- este es el que funciona con tu backend
    });
    const userData = {
      id: userInfo?.data?.user?.id,
      name: userInfo?.data?.user?.name,
      email: userInfo?.data?.user?.email,
      photoUrl: userInfo?.data?.user?.photo,
    };

    // Guardar los datos en Redux
    dispatch(setUser(userData));
    console.log("Usuario despachado");
    return true;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    console.log("Error details:", JSON.stringify(error, null, 2));
    return false;
  }
};
