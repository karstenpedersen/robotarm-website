import { div } from "@tensorflow/tfjs";
import Container from "components/Container";
import Page from "components/layouts/Page";
import Splitter from "components/Splitter";
import Tracking from "components/Tracking";
import { useMqttState } from "mqtt-react-hooks";
import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const Home: NextPage = () => {
  const { connectionStatus } = useMqttState();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <Page title="Robot arm">
      <Container
        title="Video"
        rightElement={
          <>
            <p className="lowercase text-primary">{connectionStatus}</p>
          </>
        }
      >
        <Splitter>
          <div className="relative">
            <Webcam
              ref={webcamRef}
              forceScreenshotSourceSize
              videoConstraints={{ width: 1920, height: 1080 }}
              width="1920"
              height="1080"
              className="relative w-full resize"
            />

            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full" />
          </div>

          <div id="tracking">
            {connectionStatus === "Connected" && (
              <Tracking webcamRef={webcamRef} canvasRef={canvasRef} />
            )}
          </div>
        </Splitter>
      </Container>
    </Page>
  );
};

export default Home;
