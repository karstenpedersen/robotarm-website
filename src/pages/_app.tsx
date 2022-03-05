import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Connector } from "mqtt-react-hooks";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Connector
      brokerUrl="wss://c23e5772eb9a45f297d3cfafff40547c.s1.eu.hivemq.cloud:8884/mqtt"
      options={{
        clientId: "karsten",
        host: "c23e5772eb9a45f297d3cfafff40547c.s1.eu.hivemq.cloud",
        port: 8884,
        protocol: "mqtts",
        username: "euclillebaelt-broker",
        password: "Test1234",
        keepalive: 60,
      }}
    >
      <ThemeProvider enableSystem={false} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Connector>
  );
}

export default MyApp;
