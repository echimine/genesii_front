'use client';

import React, { useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { usePhotoStore } from '../store/usePhotoStore';

interface WebCamProps {
  width: number;
  height: number;
}

const WebCam: React.FC<WebCamProps> = ({ width, height }) => {
  const webcamRef = useRef<Webcam>(null);
  const setImage = usePhotoStore((state) => state.setImage);
  const setCaptureFunction = usePhotoStore((state) => state.setCaptureFunction);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  }, [setImage]);

  // Expose la fonction à Zustand
  useEffect(() => {
    setCaptureFunction(capture);
  }, [capture, setCaptureFunction]);

  const videoConstraints = {
    width,
    height,
    facingMode: 'user',
  };

  return (
    <>
      <Webcam
        audio={false}
        height={height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={width}
        videoConstraints={videoConstraints}
      />
    </>
  );
};

export default WebCam;
