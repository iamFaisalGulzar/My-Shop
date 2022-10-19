import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { GlobalStyles } from "twin.macro";
import { Provider } from "react-redux";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./components/AuthProvider";

const httpLink = createHttpLink({
  uri: "http://localhost:3006/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = store.getState().auth.accessToken;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
