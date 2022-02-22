import {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  webcamRef: React.Component;
}

const CameraHandler: FunctionComponent<Props> = (props) => {
  const { webcamRef } = props;

  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: width, height: height },
      })
      .then((stream) => {
        let video: any = webcamRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [webcamRef]);

  return (
    <div>
      <h2>Video Settings</h2>
      <p>
        {width} x {height}
      </p>
    </div>
  );
};

export default CameraHandler;
