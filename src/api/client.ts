// src/api/client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getUserIdtoken } from "../utils/signIn";
import { SERVER_URL } from "../config/env";
// const SERVER_URL = process.env.SERVER_URL;
console.log("SERVER", SERVER_URL);

// const url = "http://192.168.0.10:3005/graphql";
// export const client = new ApolloClient({
//   link: new HttpLink({ uri: SERVER_URL }), // reemplazá con tu endpoint real
//   cache: new InMemoryCache(),
// });

// const SERVER_URL = process.env.SERVER_URL;

const httpLink = new HttpLink({ uri: SERVER_URL });

// Este middleware agrega el token a cada request
const authLink = setContext(async (_, { headers }) => {
  const token = await getUserIdtoken(); // esta función es asíncrona

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // reemplazá con tu endpoint real
  cache: new InMemoryCache(),
});
