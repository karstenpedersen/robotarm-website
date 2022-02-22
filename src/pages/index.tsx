import Page from "components/layouts/Page";
import Tracking from "components/Tracking";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const Home: NextPage = () => {
  const { client } = useMqttState();
  const { message } = useSubscription(["test"]);

  useEffect(() => {}, [message]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <Page title="Robot arm">
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
    </Page>
  );
};

export default Home;
