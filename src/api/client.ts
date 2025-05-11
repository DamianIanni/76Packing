// src/api/client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const SERVER_URL = process.env.SERVER_URL;

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://192.168.0.10:3005/graphql" }), // reemplazá con tu endpoint real
  cache: new InMemoryCache(),
});
