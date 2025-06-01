const isDev = __DEV__; // Esta variable es provista automáticamente por React Native

export const SERVER_URL = isDev
  ? "https://seven6packing-server.onrender.com/graphql" // Dirección de tu servidor local
  : "https://seven6packing-server.onrender.com/graphql"; // Tu servidor en producción
