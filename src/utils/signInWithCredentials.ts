import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import authGoogle from "@react-native-firebase/auth";
import { auth } from "./../../App";
import { handleGraphQLError } from "./errorHandler/errorHandler";

export async function waitForFirebaseUser(maxAttempts = 10, delayMs = 200) {
  for (let i = 0; i < maxAttempts; i++) {
    const user = auth.currentUser;
    if (user) return user;
    await new Promise((res) => setTimeout(res, delayMs));
  }
  throw new Error("No user logged in after waiting.");
}

// Iniciar sesión con email y contraseña
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("userCredential", userCredential);

    const userEmail = userCredential.user.email;
    return userEmail ?? null;
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.code, error.message);
    return null;
  }
};

// Registrar nuevo usuario con email y contraseña
export const registerWithEmail = async (
  email: string,
  password: string
): Promise<any | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user ?? null;
  } catch (error: any) {
    console.error("Error al registrar usuario:", error.code, error.message);
    handleGraphQLError(error, "registering user");
    return null;
  }
};

// Add reset password functionality
export async function sendPasswordReset(email: string): Promise<boolean> {
  try {
    await authGoogle().sendPasswordResetEmail(email);
    console.log("Correo de restablecimiento enviado.");
    return true;
  } catch (error: any) {
    console.error("Error al enviar el correo de restablecimiento:", error.code);
    return false;
    // throw error;
  }
}
