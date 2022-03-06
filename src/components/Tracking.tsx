import React, {
  FunctionComponent,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { useMqttState, useSubscription } from "mqtt-react-hooks";

interface Props {
  webcamRef: any;
  canvasRef: any;
  scale?: number;
}

const Tracking: FunctionComponent<Props> = (props) => {
  const { webcamRef, canvasRef, scale = 5 } = props;

  const { connectionStatus, client } = useMqttState();

  const runCoco = async () => {
    const net = await cocossd.load();

    setInterval(() => {
      detect(net);
    }, 60);
  };

  const detect = async (net: any) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth / scale;
      canvasRef.current.height = videoHeight / scale;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx, scale);

      // Locate person and send data
      var foundPerson = false;
      obj.forEach((prediction: any) => {
        // Extract boxes and classes
        const type = prediction["class"];
        const [x, y, width, height] = prediction["bbox"];

        if (!foundPerson && type === "person") {
          var left = x;
          var right = 1920 - x - width;
          var top = y;
          var bottom = 1080 - y - height;
          var message =
            '{"left": ' +
            left +
            ',"right": ' +
            right +
            ',"top": ' +
            top +
            ',"bottom": ' +
            bottom +
            ',"camWidth": ' +
            1920 +
            ',"camHeight": ' +
            1080 +
            "}";

          if (client) {
            client.publish("/test", message);
            console.log("Message: " + message);
          }

          foundPerson = true;
        }
      });
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div>
      <h2 className="subtitle mb-1">Log</h2>
      <textarea
        name="log"
        id="log"
        className="h-20 min-h-[5rem] w-full rounded bg-dark-700 p-1 text-primary"
      />
    </div>
  );
};

export const drawRect = (detections: any, ctx: any, scale: number) => {
  // Loop through each prediction
  detections.forEach((prediction: any) => {
    // Extract boxes and classes
    var [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    x = x / scale;
    y = y / scale;
    width = width / scale;
    height = height / scale;

    // Set styling
    ctx.strokeStyle = "#b95d94";
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = "#b95d94";
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

export default Tracking;
