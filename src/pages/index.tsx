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
          <p className="lowercase text-primary">{connectionStatus}</p>
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
            <h2 className="subtitle">Tracking Visuals</h2>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              aspernatur!
            </p>
          </div>
        </Splitter>
      </Container>

      <section id="video-settings">
        <Container title="MQTT Server">
          <p className="mb-2">Latest updates</p>
          <Tracking webcamRef={webcamRef} canvasRef={canvasRef} />
        </Container>
      </section>
    </Page>
  );
};

/*

<div className="relative">
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          videoConstraints={{ width: 1920, height: 1080 }}
          width="1920"
          height="1080"
          className="relative w-full resize"
        />
        <p className="absolute bottom-1 left-2 font-bold text-white">
          Video Input
        </p>
      </div>

      <div className="mt-2 grid overflow-hidden md:grid-cols-2">
        <div>
          <h2 className="font-bold">Output</h2>
          <Tracking webcamRef={webcamRef} canvasRef={canvasRef} />
        </div>

        <div>
          <canvas ref={canvasRef} className="w-full border-2" />
        </div>
      </div>

*/

export default Home;
