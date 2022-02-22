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

interface Props {
  webcamRef: any;
  canvasRef: any;
  scale?: number;
}

const Tracking: FunctionComponent<Props> = (props) => {
  const { webcamRef, canvasRef, scale = 5 } = props;

  const [trackObjects, setTrackObjects] = useState(false);

  const runCoco = async () => {
    const net = await cocossd.load();

    setInterval(() => {
      detect(net);
    }, 10);
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
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div>
      <h2>Tracking Settings</h2>
      <label htmlFor="">Track objects</label>
      <input
        type="checkbox"
        name="track objects"
        id="track-objects"
        checked={trackObjects}
        onClick={() => {
          setTrackObjects(!trackObjects);
        }}
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
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = "#" + color;
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = "#" + color;
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

/* 
        <Section sectionId="#log">
        <h2 className="font-bold">MQTT log</h2>
        <textarea
          name="log"
          id="log"
          className="h-[200px] w-full resize-none border-2"
        ></textarea>
      </Section>

      <Section sectionId="#mqtt">
        <button
          className="hover: rounded bg-blue-500 px-5 py-2 font-bold text-white"
          onClick={() => {
            client?.publish("test", "MESSAGE HERE");
          }}
        >
          Click me
        </button>

        <p>
          Topic: {message?.topic} - message: {message?.message}
        </p>
      </Section>
*/

export default Tracking;
