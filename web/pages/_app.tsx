import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.scss";
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
